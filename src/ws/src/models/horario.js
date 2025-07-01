//criando a tabela cOLABORADOR igual o que foi criado dentro do Draw.IO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horario = new Schema({
     salaoId:{
         type:mongoose.Types.ObjectId,
         ref:'Salao',
         required:true,
     },
     especialidade:[
        {
        type:mongoose.Types.ObjectId,
        ref:'Servico',
        required:true,
        },
    ],
    colaboradores:[
        {
        type:mongoose.Types.ObjectId,
        ref:'Colaborador',
        required:true,
        },
    ],
    dias:{ 
        type:[Number], // esta entre [] por que é um array de numeros, 0 = domingo, 1 = segunda, 2 = terça, 3 = quarta, 4 = quinta, 5 = sexta, 6 = sabado
        required:[true]
    },
    inicio:{ 
        type:Date, 
        required:[true]
    },
    fim:{ 
        type:Date, 
        required:[true]
    },




});

module.exports = mongoose.model('Horario', horario); // o terceiro parametro é o nome da tabela no banco de dados

