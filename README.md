# PokeManager API

> API RESTful para gerenciamento de catálogo local de Pokémons, construída com **Node.js**, **TypeScript** e **Clean Architecture**.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture-orange.svg)]()
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-brightgreen.svg)](http://localhost:3000/api/docs)

Projeto desenvolvido para a disciplina **Tópicos Especiais em Engenharia de Software (UFF)**.

---

## Sobre o Projeto

O **PokeManager API** é uma solução completa para cadastro, listagem, atualização e remoção de Pokémons.

O foco da aplicação é demonstrar a implementação prática da **Clean Architecture**, **Princípios SOLID** e **Inversão de Dependência**, mantendo as regras de negócio desacopladas do framework HTTP.

---

## Tecnologias e Ferramentas

* **Linguagem:** Node.js & TypeScript
* **Framework Web:** Express
* **Documentação Interativa:** `swagger-autogen` & `swagger-ui-express`
* **Execução & Build:** `tsx` & `typescript`
* **Qualidade de Código:** ESLint & Prettier

---

## Arquitetura do Projeto

A aplicação organiza o código em camadas concêntricas e desacopladas:

```text
src/
├── domain/          # Entidades de negócio e contratos de repositório
├── application/     # Casos de Uso (Use Cases) e DTOs
├── infrastructure/  # Controllers, Rotas Express e Persistência em Memória
└── main/            # Composição da aplicação, Factories (Injeção de Dependência) e Server
```

---

## Endpoints da API

A API segue o padrão RESTful sob o prefixo `/api/v1/pokemons`:

| Método   | Rota                   | Descrição                                                 |
| -------- | ---------------------- | --------------------------------------------------------- |
| `GET`    | `/api/v1/pokemons`     | Lista todos os Pokémons (suporta filtro `?tipo=Eletrico`) |
| `POST`   | `/api/v1/pokemons`     | Cadastra um novo Pokémon                                  |
| `GET`    | `/api/v1/pokemons/:id` | Busca um Pokémon pelo ID                                  |
| `PUT`    | `/api/v1/pokemons/:id` | Atualiza as informações de um Pokémon                     |
| `DELETE` | `/api/v1/pokemons/:id` | Remove um Pokémon do catálogo                             |

---

## Como Executar o Projeto

### Pré-requisitos

* **Node.js** (v18 ou superior)
* **npm** ou **yarn**

### Passo a Passo

#### 1. Clonar o repositório

```bash
git clone https://github.com/Leo-dk574/PokeManager-API.git
cd PokeManager-API
```

#### 2. Instalar as dependências

```bash
npm install
```

#### 3. Gerar o arquivo do Swagger

```bash
npm run swagger
```

#### 4. Iniciar o servidor em desenvolvimento

```bash
npm run dev
```

#### 5. Acessar a documentação

Navegue até a interface interativa do Swagger UI:

 **http://localhost:3000/api/docs**

---

## Exemplo de Payload (POST)

```json
{
  "nome": "Pikachu",
  "tipos": ["Eletrico"],
  "nivel": 25,
  "hp": 100
}
```
