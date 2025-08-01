const request = require('supertest');
const app = require('../server');

describe('Testes da API AbacatePay', () => {
  it('Cria um PIX com sucesso', async () => {
    const res = await request(app).post('/criar-pix').send({
      amount: 1000,
      description: "Teste",
      customer: {
        name: "Lucas Muto",
        cellphone: "(21) 99999-9999",
        email: "contatolucasmuto@email.com",
        taxId: "184.315.177-43"
      }
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('id');
  });

  it('Simula pagamento com sucesso', async () => {
    // Primeiro cria um PIX
    const pixRes = await request(app).post('/criar-pix').send({
      amount: 1000,
      description: "Teste para simulação",
      customer: {
        name: "Lucas Muto",
        cellphone: "(21) 99999-9999",
        email: "contatolucasmuto@email.com",
        taxId: "184.315.177-43"
      }
    });

    const pixId = pixRes.body.data.id;

    // Depois simula o pagamento
    const res = await request(app).post('/simular-pagamento').send({
      id: pixId
    });
    
    expect(res.statusCode).toBe(200);
  });

  it('Verifica status do pagamento', async () => {
    // Primeiro cria um PIX
    const pixRes = await request(app).post('/criar-pix').send({
      amount: 1000,
      description: "Teste para verificação",
      customer: {
        name: "Lucas Muto",
        cellphone: "(21) 99999-9999",
        email: "contatolucasmuto@email.com",
        taxId: "184.315.177-43"
      }
    });

    const pixId = pixRes.body.data.id;

    // Depois verifica o status
    const res = await request(app).get(`/status-pagamento/${pixId}`);
    
    expect(res.statusCode).toBe(200);
  });

  it('Retorna erro para dados inválidos', async () => {
    const res = await request(app).post('/criar-pix').send({
      amount: -100, // Valor inválido
      customer: {
        name: "Teste"
      }
    });
    
    expect(res.statusCode).toBe(400);
  });
}); 