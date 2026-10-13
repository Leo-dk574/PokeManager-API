import { Router } from 'express';
import { makePokemonController } from '../../../main/factories/MakePokemonController.factory';

const pokemonRoutes = Router();
const pokemonController = makePokemonController();

pokemonRoutes.get('/', (req, res) => {
  /* 
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Lista todos os Pokémons'
    #swagger.path = '/api/v1/pokemons'
  */
  pokemonController.list(req, res);
});

pokemonRoutes.post('/', (req, res) => {
  /* 
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Cria um novo Pokémon'
    #swagger.path = '/api/v1/pokemons'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados para criação do Pokémon',
      required: true,
      schema: {
        $name: 'Pikachu',
        $type: 'Eletrico',
        $level: 10
      }
    }
  */
  pokemonController.create(req, res);
});

pokemonRoutes.get('/:id', (req, res) => {
  /* 
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Busca um Pokémon por ID'
    #swagger.path = '/api/v1/pokemons/{id}'
  */
  pokemonController.getById(req, res);
});

// Exercício 2: Atualização de Nível (PATCH)
pokemonRoutes.patch('/:id/level', (req, res) => {
  /* 
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza o nível de um Pokémon'
    #swagger.path = '/api/v1/pokemons/{id}/level'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Novo nível do Pokémon',
      required: true,
      schema: {
        $level: 25
      }
    }
  */
  pokemonController.updateLevel(req, res);
});

pokemonRoutes.put('/:id', (req, res) => {
  /* 
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza um Pokémon'
    #swagger.path = '/api/v1/pokemons/{id}'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados para atualização',
      required: true,
      schema: {
        name: 'Pikachu',
        type: 'Eletrico',
        level: 15
      }
    }
  */
  pokemonController.update(req, res);
});

pokemonRoutes.delete('/:id', (req, res) => {
  /* 
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Remove um Pokémon'
    #swagger.path = '/api/v1/pokemons/{id}'
  */
  pokemonController.delete(req, res);
});

export { pokemonRoutes };