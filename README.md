# PokeManager API

> API RESTful para gerenciamento de Pokémons, treinadores e times ativos, construída com **Node.js**, **TypeScript**, **Prisma ORM (SQLite)**, integração com a **PokéAPI** e **Clean Architecture**.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57.svg)](https://www.sqlite.org/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1.svg)](https://zod.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture-orange.svg)]()
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-brightgreen.svg)](http://localhost:3000/docs)

Projeto desenvolvido para a disciplina **Tópicos Especiais em Engenharia de Software (UFF)**.

---

## Sobre o Projeto

O **PokeManager API** é uma solução completa para gerenciamento de Pokémons, treinadores e montagem de times de batalha.

A aplicação adota os princípios da **Clean Architecture**, **SOLID** e **Inversão de Dependência**, mantendo as regras de negócio totalmente desvinculadas de frameworks externos.

### Principais Funcionalidades (Etapa 1 & Etapa 2)
- **Consulta Externa:** Busca de Pokémons diretamente na PokéAPI oficial via `IPokeApiGateway`.
- **Gestão de Treinadores:** Cadastro de novos treinadores na base de dados.
- **Captura e Times:** Captura de Pokémons associada ao treinador com regra de negócio rigorosa (máximo de 6 Pokémons no time ativo).
- **Persistência de Dados:** Uso de banco relacional SQLite gerenciado pelo Prisma ORM.
- **Validação de Requisições:** Middlewares baseados em esquemas do Zod.
- **Catálogo Local:** Métodos CRUD para gerenciar o catálogo local de Pokémons.

---

## Tecnologias e Ferramentas

- **Linguagem:** Node.js & TypeScript
- **Framework Web:** Express
- **Persistência:** Prisma ORM & SQLite
- **Validação:** Zod
- **Integração Externa:** PokéAPI (`https://pokeapi.co/api/v2/`)
- **Documentação:** Swagger UI (`swagger-autogen` & `swagger-ui-express`)
- **Qualidade de Código:** ESLint & Prettier

---

## Arquitetura do Projeto

O projeto é estruturado em camadas concêntricas e bem definidas:

```text
src/
├── domain/                    # Regras de negócio puras
│   ├── entities/              # Entidades (Trainer, CapturedPokemon, etc.)
│   ├── errors/                # Erros customizados (AppError, TeamFullError, etc.)
│   ├── gateways/              # Contratos de serviços externos (IPokeApiGateway)
│   └── repositories/          # Contratos de repositórios (ITrainerRepository)
├── application/               # Casos de Uso (Use Cases)
│   └── use-cases/             # SearchPokemon, CreateTrainer, CapturePokemon, ListTeam
├── infrastructure/            # Implementações técnicas
│   ├── database/prisma/       # Repositórios Prisma e Mappers
│   ├── http/                  # Controllers, Middlewares Zod, Schemas e Rotas
│   └── providers/             # Implementação da integração com PokéAPI
└── main/                      # Ponto de entrada, Server e configurações de Swagger
```

---

## Endpoints da API

A API disponibiliza os seguintes recursos sob a versão `/api/v1`:

### PokéAPI & Pokedex
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/v1/pokedex/search?name=pikachu` | Busca os dados completos de um Pokémon na PokéAPI |

### Treinadores e Capturas
| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/api/v1/trainers` | Cria um novo treinador |
| `POST` | `/api/v1/trainers/:id/captures` | Captura um Pokémon para o time do treinador (Limite: 6) |
| `GET` | `/api/v1/trainers/:id/team` | Lista o time ativo do treinador |

### Catálogo Local (Pokémons)
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/v1/pokemons` | Lista Pokémons do catálogo local (suporta filtro `?tipo=Eletrico`) |
| `POST` | `/api/v1/pokemons` | Cadastra um novo Pokémon no catálogo local |
| `GET` | `/api/v1/pokemons/:id` | Busca um Pokémon local pelo ID |
| `PUT` | `/api/v1/pokemons/:id` | Atualiza as informações de um Pokémon local |
| `DELETE` | `/api/v1/pokemons/:id` | Remove um Pokémon do catálogo local |

---

## Como Executar o Projeto

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm**

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/Leo-dk574/PokeManager-API.git](https://github.com/Leo-dk574/PokeManager-API.git)
   cd PokeManager-API
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Executar as migrações do banco de dados (SQLite via Prisma):**
   ```bash
   npx prisma migrate dev
   ```

4. **Gerar a documentação do Swagger:**
   ```bash
   npx ts-node src/main/config/swagger-generator.ts
   ```

5. **Iniciar o servidor em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

6. **Acessar a documentação interativa:**
   Abra o navegador em: **`http://localhost:3000/docs`**

---

## Exemplos de Payloads

### Criar Treinador (`POST /api/v1/trainers`)
```json
{
  "nome": "Ash Ketchum"
}
```

### Capturar Pokémon (`POST /api/v1/trainers/{id}/captures`)
```json
{
  "pokemonName": "pikachu"
}
```
