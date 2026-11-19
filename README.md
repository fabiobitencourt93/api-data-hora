# API de Data e Hora

API REST simples desenvolvida com Node.js e Express. Ela informa a data e a hora atuais no fuso horário de São Paulo (`America/Sao_Paulo`) e pode ser consumida por aplicações web, móveis ou outros serviços.

## Tecnologias

- Node.js
- Express
- CORS

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Executando o projeto

```bash
npm start
```

Por padrão, o servidor fica disponível em `http://localhost:3000`.

É possível definir outra porta por meio da variável de ambiente `PORT`:

```bash
PORT=8080 npm start
```

No Windows PowerShell:

```powershell
$env:PORT=8080
npm start
```

Ao iniciar, a API exibe no terminal:

```text
Servidor rodando na porta 3000
```

## Endpoints

### `GET /`

Retorna a data e a hora atuais.

**Exemplo de requisição:**

```bash
curl http://localhost:3000/
```

**Exemplo de resposta:**

```json
{
  "dataHora": "18/11/2026 21:24:56",
  "data": "18/11/2026",
  "hora": "21:24:56",
  "timestamp": 1791234567294,
  "iso": "2026-11-19T00:24:56.294Z"
}
```

Os valores de `timestamp` e `iso` são somente ilustrativos.

### `GET /api/datetime`

Rota mantida para compatibilidade com frontends que utilizavam o endereço anterior. Retorna exatamente os mesmos dados de `GET /`.

**Exemplo de requisição:**

```bash
curl http://localhost:3000/api/datetime
```

**Exemplo de resposta:**

```json
{
  "dataHora": "18/11/2026 21:24:56",
  "data": "18/11/2026",
  "hora": "21:24:56",
  "timestamp": 1791234567294,
  "iso": "2026-11-19T00:24:56.294Z"
}
```

## Campos da resposta

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `dataHora` | `string` | Data e hora combinadas no formato localizado `dd/mm/aaaa hh:mm:ss` |
| `data` | `string` | Data atual no formato localizado `dd/mm/aaaa` |
| `hora` | `string` | Hora atual no formato `hh:mm:ss` |
| `timestamp` | `number` | Quantidade de milissegundos desde 1º de janeiro de 1970 (UTC) |
| `iso` | `string` | Data e hora no padrão ISO 8601 em UTC |

## Consumo no frontend

Exemplo usando JavaScript:

```javascript
const resposta = await fetch('http://localhost:3000/api/datetime');

if (!resposta.ok) {
  throw new Error(`Erro na API: ${resposta.status}`);
}

const dataHora = await resposta.json();
console.log(dataHora.dataHora);
```

## Comportamento HTTP

- Método suportado: `GET`
- Resposta: JSON
- CORS: habilitado para todas as origens
- Cache: desabilitado nas respostas
- Autenticação: não utilizada

As respostas incluem:

```text
Content-Type: application/json
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
```

## Estrutura do projeto

```text
api-data-hora/
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

O servidor é configurado em `index.js`, incluindo o middleware CORS, o controle de cache, os endpoints e a inicialização da aplicação.

## Variáveis de ambiente

| Variável | Obrigatória | Padrão | Descrição |
| --- | --- | --- | --- |
| `PORT` | Não | `3000` | Porta usada pelo servidor HTTP |

## Observações

- Os campos `data`, `hora` e `dataHora` usam o fuso horário `America/Sao_Paulo`.
- Não há armazenamento em banco de dados.
- Cada requisição calcula uma nova hora no momento da chamada.
