//criando a tabela cOLABORADOR igual o que foi criado dentro do Draw.IO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaoCliente = new Schema({
     salaoId:{
         type:mongoose.Types.ObjectId,
         ref:'Salao',
         required:true,
     },
     clienteId:{
         type:mongoose.Types.ObjectId,
         ref:'Cliente',
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

module.exports = mongoose.model('SalaoCliente', salaoCliente); // o terceiro parametro é o nome da tabela no banco de dados

