//criando a tabela cOLABORADOR igual o que foi criado dentro do Draw.IO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaoColaborador = new Schema({
     salaoId:{
         type:mongoose.Types.ObjectId,
         ref:'Salao',
         required:true,
     },
    colaboradorId:{
        type:mongoose.Types.ObjectId,
        ref:'Colaborador',
        required:true,
    },
    dataCadastro:{
            type:Date,
            default:Date.now
     },
    status:{
            type:String,
            required:true,
            enum: ['A', 'I'],      
            default: 'A' // A = Ativo, I = Inativo    
       },


});

module.exports = mongoose.model('SalaoColaborador', salaoColaborador); // o terceiro parametro é o nome da tabela no banco de dados

