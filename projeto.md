# 🥑 Guia para Integração Backend com API AbacatePay

## 🎯 Objetivo

Desenvolver um backend em Node.js + Express que atue como intermediário entre o frontend e a API do AbacatePay, realizando as seguintes operações:

* Gerar um QR Code PIX
* Simular o pagamento (em ambiente de desenvolvimento)
* Checar o status de um pagamento
* Criar testes automatizados para as funcionalidades

---

## 📦 Dependências

```bash
npm install express axios dotenv cors jest supertest
```

Crie um arquivo `.env` com a variável da chave da API:

```env
ABACATE_API_KEY=abc_dev_K3xsBTL4hxRxcmQusUABsQtT
```

---

## 🔧 Estrutura do Projeto

```
- projeto-abacatepay
  - node_modules
  - .env
  - server.js
  - routes/
    - pixRoutes.js
  - controllers/
    - pixController.js
  - tests/
    - pix.test.js
  - package.json
```

---

## ✅ 1. Gerar QR Code PIX

### Endpoint: `POST /criar-pix`

```js
// routes/pixRoutes.js
const express = require('express');
const router = express.Router();
const { criarPix } = require('../controllers/pixController');

router.post('/criar-pix', criarPix);

module.exports = router;
```

```js
// controllers/pixController.js
require('dotenv').config();
const axios = require('axios');

exports.criarPix = async (req, res) => {
  try {
    const { amount, customer, description } = req.body;
    const response = await axios.post(
      'https://api.abacatepay.com/v1/pixQrCode/create',
      {
        amount,
        expiresIn: 3600,
        description: description || "Pagamento via sistema",
        customer
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ABACATE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
```

---

## 🧪 2. Simular Pagamento PIX

### Endpoint: `POST /simular-pagamento`

```js
// controllers/pixController.js (adicionar ao mesmo arquivo)
exports.simularPagamento = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await axios.post(
      `https://api.abacatepay.com/v1/pixQrCode/simulate-payment?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.ABACATE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
```

```js
// routes/pixRoutes.js (adicionar)
const { simularPagamento } = require('../controllers/pixController');
router.post('/simular-pagamento', simularPagamento);
```

---

## 🔍 3. Checar Status do Pagamento

### Endpoint: `GET /status-pagamento/:id`

```js
// controllers/pixController.js (adicionar)
exports.checarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.abacatepay.com/v1/pixQrCode/check?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ABACATE_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
```

```js
// routes/pixRoutes.js (adicionar)
const { checarStatus } = require('../controllers/pixController');
router.get('/status-pagamento/:id', checarStatus);
```

---

## 🚀 Inicialização do Servidor

```js
// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pixRoutes = require('./routes/pixRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', pixRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
```

---

## 🧪 Testes Automatizados com Jest e Supertest

```js
// tests/pix.test.js
const request = require('supertest');
const app = require('../server'); // exporte app do server.js se necessário

describe('Testes da API AbacatePay', () => {
  it('Cria um PIX com sucesso', async () => {
    const res = await request(app).post('/criar-pix').send({
      amount: 1000,
      description: "Teste",
      customer: {
        name: "Lucas Muto",
        cellphone: "(21) 99999-9999",
        email: "lucas@email.com",
        taxId: "123.456.789-00"
      }
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('id');
  });
});
```

> ⚠️ Para testar outras rotas, use mocks ou endpoints reais com chaves válidas e devMode habilitado.

---

## 📬 Referências Úteis

* [Criar QR Code PIX](https://docs.abacatepay.com/pages/pix-qrcode/create)
* [Simular Pagamento](https://docs.abacatepay.com/pages/pix-qrcode/simulate-payment)
* [Checar Status](https://docs.abacatepay.com/pages/pix-qrcode/check)

---

Esse guia está pronto para ser usado no Cursor AI e permitirá montar uma aplicação robusta em até 1 dia com testes incluídos.
