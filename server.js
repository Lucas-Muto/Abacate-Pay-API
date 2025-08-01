require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pixRoutes = require('./routes/pixRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', pixRoutes);

const PORT = process.env.PORT || 3000;

// Só inicia o servidor se não estiver sendo usado para testes
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app; 