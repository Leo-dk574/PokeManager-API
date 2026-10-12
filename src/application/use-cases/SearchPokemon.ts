import { IPokeApiGateway, PokemonDTO } from '../../domain/gateways/poke-api.gateway';
import { AppError } from '../../domain/errors/app.error';

export class SearchPokemonUseCase {
  constructor(private pokeApiGateway: IPokeApiGateway) {}

  async execute(name: string): Promise<PokemonDTO> {
    if (!name || name.trim() === '') {
      throw new AppError('O nome do Pokémon para busca é obrigatório.', 400);
    }

    return await this.pokeApiGateway.getPokemonByName(name.trim());
  }
}