import { Router } from 'express';
import { PokedexController } from '../controllers/pokedex.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { searchPokemonQuerySchema } from '../schemas/pokedex.schema';

const pokedexRoutes = Router();
const controller = new PokedexController();

pokedexRoutes.get(
  '/pokedex/search',
  validateRequest({ query: searchPokemonQuerySchema }),
  controller.search
);

export { pokedexRoutes };