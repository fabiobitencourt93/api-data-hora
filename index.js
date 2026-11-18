const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

function obterDataHoraAtual() {
  const agora = new Date();
  const fuso = 'America/Sao_Paulo';

  const data = agora.toLocaleDateString('pt-BR', { timeZone: fuso });
  const hora = agora.toLocaleTimeString('pt-BR', { timeZone: fuso });

  return {
    dataHora: `${data} ${hora}`,
    data,
    hora,
    timestamp: agora.getTime(),
    iso: agora.toISOString(),
  };
}

// Middleware para evitar cache nas respostas
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  next();
});

// Rota raiz já retorna a data e hora atuais
app.get('/', (req, res) => {
  res.json(obterDataHoraAtual());
});

// Rota /api/datetime mantida para compatibilidade com o frontend
app.get('/api/datetime', (req, res) => {
  res.json(obterDataHoraAtual());
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});