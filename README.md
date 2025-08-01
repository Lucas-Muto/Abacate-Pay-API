# 🥑 Backend AbacatePay

Backend intermediário entre frontend e a API do AbacatePay para processamento de pagamentos PIX. Este projeto permite criar, simular e verificar pagamentos PIX de forma simples e eficiente.

## 📺 Tutorial em Vídeo

🎥 **Tutorial Completo no YouTube:** [LINK_DO_VIDEO_AQUI]

*Assista ao vídeo para um guia visual completo de instalação e configuração!*

---

## 🎯 O que este projeto faz?

- ✅ Cria QR Codes PIX para pagamentos
- ✅ Simula pagamentos (ambiente de desenvolvimento)
- ✅ Verifica status de pagamentos
- ✅ Funciona como intermediário entre seu frontend e a API AbacatePay
- ✅ Inclui testes automatizados
- ✅ Pronto para deploy em produção

---

## 🚀 Instalação Rápida

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Git](https://git-scm.com/)
- Conta no [AbacatePay](https://app.abacatepay.com/)

### Passo 1: Baixar o Projeto
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/abacate-pay-api.git

# Entre na pasta
cd abacate-pay-api
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

1. **Copie o arquivo de exemplo:**
```bash
cp .env.example .env
```

2. **Edite o arquivo `.env`:**
```bash
# Abra o arquivo .env em um editor de texto
notepad .env  # Windows
# ou
nano .env     # Linux/Mac
```

3. **Configure sua chave da API:**
```env
ABACATE_API_KEY=sua_chave_api_aqui
PORT=3000
```

### Passo 4: Obter Chave da API AbacatePay

1. Acesse [https://app.abacatepay.com/](https://app.abacatepay.com/)
2. Crie uma conta ou faça login
3. Vá em **Configurações** → **API Keys**
4. Copie sua chave de desenvolvimento
5. Cole no arquivo `.env` no lugar de `sua_chave_api_aqui`

### Passo 5: Testar Localmente
```bash
# Executar em desenvolvimento
npm run dev

# Ou executar em produção
npm start
```

O servidor estará rodando em: `http://localhost:3000`

---

## 🧪 Testando a Aplicação

### Testes Automatizados
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

### Testes Manuais com Postman

1. **Criar um PIX:**
   - Método: `POST`
   - URL: `http://localhost:3000/criar-pix`
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "amount": 1000,
     "description": "Teste de pagamento",
     "customer": {
       "name": "João Silva",
       "cellphone": "(11) 99999-9999",
       "email": "joao@email.com",
       "taxId": "123.456.789-00"
     }
   }
   ```

2. **Simular Pagamento:**
   - Método: `POST`
   - URL: `http://localhost:3000/simular-pagamento`
   - Body:
   ```json
   {
     "id": "ID_DO_PIX_CRIADO"
   }
   ```

3. **Verificar Status:**
   - Método: `GET`
   - URL: `http://localhost:3000/status-pagamento/ID_DO_PIX`

---

## 🌐 Deploy no Render

### Passo 1: Preparar o Projeto

1. **Certifique-se de que o projeto está no GitHub**
2. **Verifique se o arquivo `package.json` tem o script `start`**
3. **Confirme que o arquivo `.env.example` existe**

### Passo 2: Criar Conta no Render

1. Acesse [https://render.com/](https://render.com/)
2. Crie uma conta gratuita
3. Conecte sua conta do GitHub

### Passo 3: Deploy da Aplicação

1. **Clique em "New +" → "Web Service"**
2. **Conecte seu repositório GitHub**
3. **Configure o serviço:**
   - **Name:** `abacate-pay-api` (ou o nome que preferir)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

4. **Configure as variáveis de ambiente:**
   - Clique em **Environment**
   - Adicione:
     - `ABACATE_API_KEY` = sua_chave_api_aqui
     - `PORT` = 10000 (Render usa porta 10000)

5. **Clique em "Create Web Service"**

### Passo 4: Verificar o Deploy

- Aguarde alguns minutos para o build
- Render fornecerá uma URL como: `https://seu-app.onrender.com`
- Teste a URL no Postman

---

## 📡 Endpoints da API

### POST /criar-pix
Cria um QR Code PIX para pagamento.

**URL:** `https://seu-app.onrender.com/criar-pix`

**Body:**
```json
{
  "amount": 1000,
  "description": "Pagamento teste",
  "customer": {
    "name": "João Silva",
    "cellphone": "(11) 99999-9999",
    "email": "joao@email.com",
    "taxId": "123.456.789-00"
  }
}
```

**Resposta:**
```json
{
  "error": null,
  "data": {
    "id": "pix_123456789",
    "amount": 1000,
    "status": "PENDING",
    "brCode": "00020101021126580014BR.GOV.BCB.PIX...",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

### POST /simular-pagamento
Simula um pagamento PIX (apenas em desenvolvimento).

**URL:** `https://seu-app.onrender.com/simular-pagamento`

**Body:**
```json
{
  "id": "pix_123456789"
}
```

### GET /status-pagamento/:id
Verifica o status de um pagamento PIX.

**URL:** `https://seu-app.onrender.com/status-pagamento/pix_123456789`

---

## 🔧 Estrutura do Projeto

```
abacate-pay-api/
├── server.js              # Servidor principal
├── routes/
│   └── pixRoutes.js      # Rotas PIX
├── controllers/
│   └── pixController.js   # Lógica de negócio
├── tests/
│   └── pix.test.js       # Testes automatizados
├── .env.example          # Template de variáveis
├── .env                  # Suas variáveis (não commitado)
├── package.json          # Dependências
└── README.md            # Este arquivo
```

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Testes
npm test

# Testes em modo watch
npm run test:watch

# Instalar dependências
npm install

# Verificar versão do Node
node --version
```

---

## ❓ Troubleshooting

### Problema: "Cannot find module"
**Solução:** Execute `npm install`

### Problema: "Port already in use"
**Solução:** Mude a porta no `.env` ou mate o processo:
```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
pkill node
```

### Problema: "Invalid API key"
**Solução:** Verifique se a chave no `.env` está correta

### Problema: Render não inicia
**Solução:** Verifique se o `package.json` tem o script `start`

---

## 📚 Recursos Adicionais

- [Documentação AbacatePay](https://docs.abacatepay.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Render Documentation](https://render.com/docs)

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🆘 Suporte

- 📧 Email: seu-email@exemplo.com
- 💬 Discord: [Link do servidor]
- 🐛 Issues: [GitHub Issues]

---

**⭐ Se este projeto te ajudou, deixe uma estrela no repositório!** 