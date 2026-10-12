export interface PokemonDTO {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
}

export interface IPokeApiGateway {
  getPokemonByName(name: string): Promise<PokemonDTO>;
}