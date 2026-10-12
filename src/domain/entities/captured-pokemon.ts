export interface CapturedPokemon {
  id: string;
  trainerId: string;
  pokeApiId: number;
  nome: string;
  imagemUrl: string;
  tipos: string;
  hpBase: number;
  ataqueBase: number;
  defesaBase: number;
  isActive: boolean;
}