//criando a tabela salao igual o que foi criado dentro do Draw.oi

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salao = new Schema({
    nome:{ 
        type:String, 
        required:[true, 'O nome é obrigatório!']
    },
    foto:String,
    capa:String,
    email:{ 
        type:String, 
        required:[true, 'E-mail é obrigatório!']
    },
    senha:{ 
        type:String, 
        default:null,
    },
    telefone:String,
    endereco:{
        cidade:String,
        uf:String,
        cep:String,
        numero:String,
        pais:String
    },
    geo:{
        type:String,
        coordinates:Array
    },
    dataCadastro:{
        type:Date,
        default:Date.now
    },
});

salao.index({geo:'2dsphere'}); // indexando o campo geo para fazer a busca por geolocalização


module.exports = mongoose.model('Salao', salao); // o terceiro parametro é o nome da tabela no banco de dados

