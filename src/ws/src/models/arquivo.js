//criando a tabela cOLABORADOR igual o que foi criado dentro do Draw.IO

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arquivo = new Schema({
    referenciaId:{
        type: Schema.Types.ObjectId,
        refPath: 'model',
    },
    model:{
        type: String,
        required: true,
        enum: ['Servico','Salao']
    },
    caminho: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },


});

module.exports = mongoose.model('Arquivo', arquivo); // o terceiro parametro é o nome da tabela no banco de dados

