//criando a tabela cOLABORADOR igual o que foi criado dentro do Draw.IO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaborador = new Schema({
    nome:{
        type:String,
        required:true          
    },
    telefone:{
        type:String,
        required:true          
    },
    email:{
        type:String,
        required:true          
    },
    senha:{
        type:String,
        required:true          
    },
    foto:{
        type:String,
        required:true          
    },
    dataNascimento:{
        type:String, // formato YYYY-MM-DD
        required:true          
    },
    sexo:{
        type:String,
        enum: ['M', 'F'],
        required:true          
    },
    status:{
        type:String,
        required:true,
        enum: ['A', 'I'],      
        default: 'A' // A = Ativo, I = Inativo    
    },
    contaBancaria:{ 
        titular:{
            type:String,
            required:true          
        },
        cpfCnpj:{
            type:String,
            required:true          
        },
        banco:{
            type:String,
            required:true          
        },
        tipo:{
            type:String,
            required:true          
        },
        agencia:{
            type:String,
            required:true          
        },
        numero:{
            type:String,
            required:true          
        },
        dv:{
            type:String,
            required:true          
        }
    },
    dataCadastro:{
        type:Date,
        default:Date.now
    },
    recipientId:{
        type:String,
        required:true          
    }
});

module.exports = mongoose.model('Colaborador', colaborador); // o terceiro parametro é o nome da tabela no banco de dados

