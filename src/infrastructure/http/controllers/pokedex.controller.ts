import { Request, Response, NextFunction } from 'express';
import { PokeApiProvider } from '../../providers/poke-api.provider';
import { SearchPokemonUseCase } from '../../../application/use-cases/SearchPokemon';

export class PokedexController {
  private pokeApiGateway = new PokeApiProvider();
  private searchPokemonUseCase = new SearchPokemonUseCase(this.pokeApiGateway);

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = req.query.name as string;
      const pokemon = await this.searchPokemonUseCase.execute(name);
      return res.status(200).json(pokemon);
    } catch (error) {
      next(error);
    }
  };
}