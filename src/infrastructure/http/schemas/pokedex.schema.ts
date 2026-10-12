import { z } from 'zod';

export const searchPokemonQuerySchema = z.object({
  name: z.string().min(1, 'O nome do Pokémon é obrigatório para a busca.'),
});