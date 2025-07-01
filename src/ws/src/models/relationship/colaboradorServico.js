//criando a tabela cOLABORADOR igual o que foi criado dentro do Draw.IO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaboradorServico = new Schema({
    colaboradorId:{
        type:mongoose.Types.ObjectId,
        ref:'Colaborador',
        required:true,
    },
     servicoId:{
         type:mongoose.Types.ObjectId,
         ref:'Servico',
         required:true,
     },
     status:{
        type:String,
        required:true,
        enum: ['A', 'I'],      
        default: 'A' // A = Ativo, I = Inativo    
   },
    dataCadastro:{
            type:Date,
            default:Date.now
     },



});

module.exports = mongoose.model('ColaboradorServico', colaboradorServico); // o terceiro parametro é o nome da tabela no banco de dados

