const express = require('express');
const router = express.Router();
const Salao = require('../models/salao');
const Servico = require('../models/servico');


router.post('/', async (req, res) => {
    try {
        const salao = await new Salao(req.body).save();
        res.json({salao});

    }catch (error) {
        res.json({error: true, message: error.message});
    }

});
//criando o get para servicos consumir informações de salao
router.get('/servicos/:salaoId', async (req, res) => {
    try{
        const { salaoId } = req.params;
        const servicos = await Servico.find({ 
            salaoId,
            status: 'A'
         }).select('_id titulo');

        res.json({
            servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })),
        });

    }catch (error) {
        res.json({error: true, message: error.message});

    }
})

module.exports = router;