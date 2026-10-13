import { PgPokemonRepository } from '@infrastructure/database/postgres/pg-pokemon-repository'; // Ajuste o caminho se necessário
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemon';
import { ListPokemonUseCase } from '@application/use-cases/ListPokemon';
import { GetPokemonbyIdUseCase } from '@application/use-cases/GetPokemonbyId';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemon';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemon';
import { PokemonController } from '@infrastructure/http/controllers/pokemon.controller';

const pokemonRepository = new PgPokemonRepository();

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