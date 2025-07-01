const mongoose = require('mongoose');
const URI = 'mongodb+srv://ferreiranerdphf:wqPL7sxHH3M0G6i1@cluster0.lycvxh6.mongodb.net/salao-na-mao?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar no MongoDB:', err));
