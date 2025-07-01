//criando a tabela cOLABORADOR igual o que foi criado dentro do Draw.IO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cliente = new Schema({
    nome:{
        type:String,
        required:true          
    },
    telefone:{
        type:String,
        required:true          
    }, 
    status:{
        type:String,
        required:true,
        enum: ['A', 'I'],      
        default: 'A' // A = Ativo, I = Inativo    
    },
    sexo:{
        type:String,
        enum: ['M', 'F'],
        required:true          
    },
    dataNascimento:{
        type:String, // formato YYYY-MM-DD
        required:true          
    },
    foto:{
        type:String,
        required:true          
    }, 
    senha:{
        type:String,
        required:true          
    }, 
    email:{
        type:String,
        enum:['individual','corporation'] ,// indicidual = cpf, corporation = cnpj
        required:true          
    }, 
    documento:{ 
        tipo:{
            type:String,
            required:true          
        },
        numero:{
            type:String,
            required:true          
        }
    },
    endereco:{ 
        pais:{
            type:String,
            required:true          
        },
        numero:{
            type:Number,
            required:true          
        },
        cep:{
            type:String,
            required:true          
        },  
        uf:{
            type:String,
            required:true          
        },        
        cidade:{
            type:String,
            required:true          
        } 
    },
    dataCadastro:{
        type:Date,
        default:Date.now
    },


});

module.exports = mongoose.model('Cliente', cliente); // o terceiro parametro é o nome da tabela no banco de dados

