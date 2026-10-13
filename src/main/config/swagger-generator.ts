import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'PokéManager API',
    description:
      'API de gerenciamento de Pokémons desenvolvida para a disciplina Tópicos Especiais em Engenharia de Software (UFF)',
  },
  host: 'localhost:3333',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento do catálogo de Pokémons',
    },
    {
      name: 'Trainers',
      description: 'Endpoints de gerenciamento de Treinadores',
    },
    {
      name: 'Pokedex',
      description: 'Endpoints de gerenciamento da Pokédex / Capturas',
    },
  ],
  definitions: {
    Pokemon: {
      id: '65efd7eb-78e5-45d1-960a-8248c96dca82',
      nome: 'Pikachu',
      tipos: ['Eletrico'],
      nivel: 25,
      hp: 100,
    },
    CreatePokemonDto: {
      $nome: 'Pikachu',
      $tipos: ['Eletrico'],
      $nivel: 25,
      $hp: 100,
    },
    ErrorResponse: {
      error: 'Recurso não encontrado.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../server.ts'),
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
  path.resolve(__dirname, '../../infrastructure/http/routes/trainer.routes.ts'),
  path.resolve(__dirname, '../../infrastructure/http/routes/pokedex.routes.ts'), 
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);