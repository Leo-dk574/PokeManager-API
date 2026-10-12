import axios from 'axios';
import { IPokeApiGateway, PokemonDTO } from '../../domain/gateways/poke-api.gateway';
import { NotFoundError } from '../../domain/errors/notFound.error';

export class PokeApiProvider implements IPokeApiGateway {
  async getPokemonByName(name: string): Promise<PokemonDTO> {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const data = response.data;

      const hp = data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0;
      const attack = data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0;
      const defense = data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0;

      return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default || '',
        types: data.types.map((t: any) => t.type.name),
        hp,
        attack,
        defense,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new NotFoundError(`Pokémon '${name}'`);
      }
      throw error;
    }
  }
}