import { NotFoundError } from '../../domain/errors/notFound.error';

export interface PokemonApiData {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
}

export class PokeApiClient {
  async getPokemonByName(name: string): Promise<PokemonApiData> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    if (!response.ok) {
      throw new NotFoundError(`Pokémon '${name}'`);
    }

    const data = await response.json();

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
  }
}