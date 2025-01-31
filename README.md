# POC API CSV

API RESTful para processar e exibir a lista de indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards.

## 📌 Tecnologias Utilizadas

- Node.js
- Express.js
- SQLite (em memória)
- Jest & Supertest (para testes de integração)

## 🚀 Instalação e Execução

### 1️⃣ Clonar o repositório

```sh
git clone https://github.com/sudorafa/poc-csv.git
cd poc-csv
```

### 2️⃣ Instalar dependências

```sh
npm install
```

### 3️⃣ Executar o servidor

```sh
npm run dev
```

A API estará disponível em `http://localhost:3000`.

### 4️⃣ Executar testes

#### 🔹 Testes de Integração

```sh
npm test
```

## 📌 Endpoints Disponíveis

### 🔹 Obter o produtor com maior e menor intervalo entre prêmios

```
GET /api/intervals
```

**Resposta:**

```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    }
  ]
}
```

## 📌 Estrutura do Arquivo CSV

O arquivo `Movielist.csv` na raiz do projeto, deve conter os seguintes campos:

```
year;title;studios;producers;winner
1980;Can't Stop the Music;Associated Film Distribution;Allan Carr;yes
1980;Cruising;Lorimar Productions, United Artists;Jerry Weintraub;
...
```

## 📌 Estrutura do Banco de Dados (SQLite)

A aplicação utiliza um banco de dados relacional em memória, modelado da seguinte forma:

### 🔹 Tabelas:

**movies** (Filmes)

- `id` (INTEGER, PRIMARY KEY)
- `title` (TEXT)
- `Producers` (Lista de Produtores) []
- `Studios` (Lista de Estúdios) []

**studios** (Estúdios)

- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT UNIQUE)

**producers** (Produtores)

- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT UNIQUE)

**nominees** (Registros de indicacão)

- `id` (INTEGER, PRIMARY KEY)
- `movieId` (INTEGER, FOREIGN KEY -> movies.id)
- `year` (INTEGER)
- `isWinner` (BOOLEAN)
