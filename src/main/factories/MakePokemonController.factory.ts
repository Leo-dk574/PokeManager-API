import { InMemoryPokemonRepository } from '@infrastructure/database/inMemoryPokemonRepository';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemon';
import { ListPokemonUseCase } from '@application/use-cases/ListPokemon';
import { GetPokemonbyIdUseCase } from '@application/use-cases/GetPokemonbyId';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemon';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemon';
import { PokemonController } from '@infrastructure/http/controllers/pokemon.controller';

// Repositório compartilhado (Singleton em memória durante a execução do servidor)
const pokemonRepository = new InMemoryPokemonRepository();

export function makePokemonController(): PokemonController {
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const getPokemonUseCase = new GetPokemonbyIdUseCase(pokemonRepository);
  const listPokemonUseCase = new ListPokemonUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    createPokemonUseCase,
    getPokemonUseCase,
    listPokemonUseCase,
    updatePokemonUseCase,
    deletePokemonUseCase
  );
}