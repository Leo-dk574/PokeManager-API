import { ITrainerRepository } from '../../domain/repositories/trainer-repository';
import { PokeApiClient } from '../../infrastructure/http/poke-api.client';
import { NotFoundError } from '../../domain/errors/notFound.error';
import { TeamFullError } from '../../domain/errors/teamFull.error';
import { CapturedPokemon } from '../../domain/entities/captured-pokemon';

export class CapturePokemonUseCase {
  constructor(
    private trainerRepository: ITrainerRepository,
    private pokeApiClient: PokeApiClient
  ) {}

  async execute(trainerId: string, pokemonName: string): Promise<CapturedPokemon> {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new NotFoundError('Treinador');
    }

    const currentTeamCount = await this.trainerRepository.countTeamMembers(trainerId);
    if (currentTeamCount >= 6) {
      throw new TeamFullError();
    }

    const pokemonData = await this.pokeApiClient.getPokemonByName(pokemonName);

    return await this.trainerRepository.addPokemon({
      trainerId,
      pokeApiId: pokemonData.id,
      nome: pokemonData.name,
      imagemUrl: pokemonData.sprite,
      tipos: pokemonData.types.join(','),
      hpBase: pokemonData.hp,
      ataqueBase: pokemonData.attack,
      defesaBase: pokemonData.defense,
    });
  }
}