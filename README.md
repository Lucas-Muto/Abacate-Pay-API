# 🥑 Backend AbacatePay

Backend intermediário entre frontend e a API do AbacatePay para processamento de pagamentos PIX.

## 🚀 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com sua chave da API
```

## 🏃‍♂️ Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 📡 Endpoints

### POST /criar-pix
Cria um QR Code PIX para pagamento.

**Body:**
```json
{
  "amount": 1000,
  "description": "Pagamento teste",
  "customer": {
    "name": "Lucas Muto",
    "cellphone": "(21) 99999-9999",
    "email": "contatolucasmuto@email.com",
    "taxId": "184.315.177-43"
  }
}
```

### POST /simular-pagamento
Simula um pagamento PIX (apenas em desenvolvimento).

**Body:**
```json
{
  "id": "pix_id_aqui"
}
```

### GET /status-pagamento/:id
Verifica o status de um pagamento PIX.

**Parâmetros:**
- `id`: ID do pagamento PIX

## 🔧 Estrutura do Projeto

```
├── server.js              # Servidor principal
├── routes/
│   └── pixRoutes.js      # Rotas PIX
├── controllers/
│   └── pixController.js   # Lógica de negócio
├── tests/
│   └── pix.test.js       # Testes automatizados
└── .env                   # Variáveis de ambiente
```

## 📚 Documentação da API

- [Criar QR Code PIX](https://docs.abacatepay.com/pages/pix-qrcode/create)
- [Simular Pagamento](https://docs.abacatepay.com/pages/pix-qrcode/simulate-payment)
- [Checar Status](https://docs.abacatepay.com/pages/pix-qrcode/check)

## ⚠️ Importante

- Este backend funciona como intermediário entre seu frontend e a API do AbacatePay
- Use apenas em ambiente de desenvolvimento com a chave de teste fornecida
- Para produção, configure sua própria chave da API no arquivo `.env` 