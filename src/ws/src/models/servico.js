//criando a tabela salao igual o que foi criado dentro do Draw.oi

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servico = new Schema({
    salaoId:{
        type:mongoose.Types.ObjectId,
        ref:'Salao',
        required:true,
    },
    titulo:{ 
        type:String, 
        required:[true]
    },
    preco:{ 
        type:Number, 
        required:[true]
    },
    duracao:{ 
        type:Number, // do serviços em minutos
        required:[true]
    },
    comissao:{ 
        type:Number, // % de comissao sobre o preço
        required:[true]
    },
    recorrencia:{ 
        type:Number, // periodo que deve ser refeito o serviço em dias
        required:[true]
    },
    descricao:{ 
        type:String, 
        required:[true]
    },
    status:{
        type:String,
        required:true,
        enum: ['A', 'I', 'E'], // A = Ativo, I = Inativo, E = Excluido       
        default: 'A' // A = Ativo, I = Inativo, E = Excluido   
    },
    dataCadastro:{
        type:Date,
        default:Date.now
    },

});


module.exports = mongoose.model('Servico', servico); // o terceiro parametro é o nome da tabela no banco de dados

