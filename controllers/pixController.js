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