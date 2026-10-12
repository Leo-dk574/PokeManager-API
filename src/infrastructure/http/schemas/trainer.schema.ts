import { z } from 'zod';

export const createTrainerSchema = z.object({
  nome: z.string().min(2, 'O nome do treinador deve ter pelo menos 2 caracteres.'),
});

export const capturePokemonBodySchema = z.object({
  pokemonName: z.string().min(1, 'O nome do Pokémon é obrigatório.'),
});

export const trainerIdParamSchema = z.object({
  id: z.string().uuid('ID de treinador inválido (deve ser UUID).'),
});