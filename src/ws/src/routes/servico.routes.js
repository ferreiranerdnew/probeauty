const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws');
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const Arquivos = require('../models/arquivo');

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

/* Rota POST - Criar serviço no banco de dados e fazer upload de arquivos na AWS S3
  existe no banco de dados uma tabela chamada "servicos" que armazena os serviços de um salão
  e uma tabela chamada "arquivos" que armazena os arquivos relacionados a esses serviços
  a rota recebe um JSON com os dados do serviço e arquivos para upload
  e retorna o serviço criado e os arquivos salvos
  A rota também faz o upload dos arquivos para o S3 e salva os caminhos no banco de dados
*/
router.post('/', (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  
  busboy.on('finish', async () => {
    try {
      let errors = [];
      let arquivos = [];

      // console.log('📁 Arquivos recebidos:', req.files);
        
      if (req.files && Object.keys(req.files).length > 0) {
        for (let key of Object.keys(req.files)) {
          const file = req.files[key];

          const nameParts = file.name.split('.');
          const fileName = `${new Date().getTime()}.${
            nameParts[nameParts.length - 1]
          }`;
          const path = `servicos/${req.body.salaoId}/${fileName}`;

          // console.log(`📤 Fazendo upload: ${file.name} -> ${path}`);

          const response = await aws.uploadToS3(file, path);

          if (response.error) {
            // console.error('❌ Erro no upload:', response.message);
            errors.push({ error: true, message: response.message.message || response.message });
          } else {
            // console.log('✅ Upload realizado com sucesso:', path);
            arquivos.push(path);
          }
        }
      } 

      if (errors.length > 0) {
        // console.error('❌ Erros no upload:', errors);
        res.json(errors[0]);
        return;
      }

      // CRIAR SERVIÇO
      let jsonServico = JSON.parse(req.body.servico);
      jsonServico.salaoId = req.body.salaoId;

      // console.log('📦 Dados do serviço antes de salvar:', jsonServico);
      const servicoCadastrado = await new Servico(jsonServico).save();
      // console.log('✅ Serviço salvo com sucesso:', servicoCadastrado._id);

      // CRIAR ARQUIVOS - usando 'caminho' consistentemente
      if (arquivos.length > 0) {
        const arquivosParaSalvar = arquivos.map((caminhoArquivo) => ({
          referenciaId: servicoCadastrado._id,
          model: 'Servico',
          caminho: caminhoArquivo 
        }));

        // console.log('💾 Salvando arquivos:', arquivosParaSalvar);
        const arquivosSalvos = await Arquivos.insertMany(arquivosParaSalvar);
        // console.log('✅ Arquivos salvos com sucesso:', arquivosSalvos.length);

        res.json({ 
          error: false,
          servico: servicoCadastrado, 
          arquivos: arquivosSalvos 
        });
      } else {
        res.json({ 
          error: false,
          servico: servicoCadastrado, 
          arquivos: [] 
        });
      }
      
    } catch (err) {
      // console.error('❌ Erro geral na rota:', err);
      res.json({ error: true, message: err.message });
    }
  });

  req.pipe(busboy);
});

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

/* Rota PUT - Atualizar serviço
  Apos o upload dos arquivos, atualiza o serviço no banco de dados e salva os caminhos dos arquivos
  A rota recebe o ID do serviço a ser atualizado e os dados do serviço em formato JSON
  e os arquivos para upload
  Retorna o serviço atualizado e os arquivos salvos
*/
router.put('/:id', async (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  
  busboy.on('finish', async () => {
    try {
      let errors = [];
      let arquivos = [];

      if (req.files && Object.keys(req.files).length > 0) {
        for (let key of Object.keys(req.files)) {
          const file = req.files[key];

          const nameParts = file.name.split('.');
          const fileName = `${new Date().getTime()}.${
            nameParts[nameParts.length - 1]
          }`;
          const path = `servicos/${req.body.salaoId}/${fileName}`;

          const response = await aws.uploadToS3(file, path);

          if (response.error) {
            errors.push({ error: true, message: response.message.message || response.message });
          } else {
            arquivos.push(path);
          }
        }
      }

      if (errors.length > 0) {
        res.json(errors[0]);
        return;
      }

      // ATUALIZAR SERVIÇO
      let jsonServico = JSON.parse(req.body.servico);
      await Servico.findByIdAndUpdate(req.params.id, jsonServico);

      // CRIAR ARQUIVOS - usando 'caminho' consistentemente
      if (arquivos.length > 0) {
        const arquivosParaSalvar = arquivos.map((caminhoArquivo) => ({
          referenciaId: req.params.id,
          model: 'Servico',
          caminho: caminhoArquivo,
        }));
        await Arquivos.insertMany(arquivosParaSalvar);
      }

      res.json({ error: false });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });
  
  req.pipe(busboy);
});

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

/* Rota GET - Buscar serviços do salão
  Esta rota busca todos os serviços de um salão específico, excluindo aqueles com status 'E' (excluído).
  Ela retorna os serviços encontrados e, para cada serviço, busca os arquivos relacionados.
  A resposta inclui os serviços e seus respectivos arquivos.
  @param {string} salaoId - ID do salão cujos serviços serão buscados.
  @returns {Object} - Um objeto contendo um array de serviços e seus arquivos.
  @throws {Error} - Se ocorrer um erro ao buscar os serviços ou arquivos.
*/
router.get('/salao/:salaoId', async (req, res) => {
  try {
    let servicosSalao = [];
    const servicos = await Servico.find({
      salaoId: req.params.salaoId,
      status: { $ne: 'E' },
    });

    for (let servico of servicos) {
      const arquivos = await Arquivos.find({
        model: 'Servico',
        referenciaId: servico._id,
      });
      servicosSalao.push({ ...servico._doc, arquivos });
    }

    res.json({
      error: false,
      servicos: servicosSalao,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// Rota POST - Remover arquivo
router.post('/remove-arquivo', async (req, res) => {
  try {
    const { arquivo } = req.body;

    // EXCLUIR DA AWS
    await aws.deleteFileS3(arquivo);

    // EXCLUIR DO BANCO DE DADOS - usando 'caminho' consistentemente
    await Arquivos.findOneAndDelete({
      caminho: arquivo,
    });

    res.json({ error: false, message: 'Arquivo excluído com sucesso!' });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// Rota DELETE - Excluir serviço (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    await Servico.findByIdAndUpdate(req.params.id, { status: 'E' });
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;