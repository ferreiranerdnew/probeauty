const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const buboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
require('./database');

// Utilizar o morgan apenas quando estiver em desenvolvimento
// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(buboy());
app.use(busboyBodyParser());
app.use(cors());


// VARIABLES
app.set('port', 8000);

// ROTAS
app.use('/salao', require('./src/routes/salao.routes'));
app.use('/servico', require('./src/routes/servico.routes'));

// ROTA PADRÃO
app.get('/', (req, res) => {
  res.send('API Online. Use /salao ou /servico.');
});

app.listen(app.get('port'), () => { 
  console.log(`WS Escutando na porta ${app.get('port')}`);
});

app.listen(app.get('port'), () => { 
  console.log(`WS Escutando na porta ${app.get('port')}`);
});