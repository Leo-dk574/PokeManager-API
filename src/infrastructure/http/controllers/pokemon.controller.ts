import { Request, Response } from 'express';
import { GetPokemonbyIdUseCase } from '@application/use-cases/GetPokemonbyId';
import { ListPokemonUseCase } from '@application/use-cases/ListPokemon';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemon';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemon';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemon';

export class PokemonController {
  constructor(
    private createPokemonUseCase: CreatePokemonUseCase,
    private getPokemonUseCase: GetPokemonbyIdUseCase,
    private listPokemonUseCase: ListPokemonUseCase,
    private updatePokemonUseCase: UpdatePokemonUseCase,
    private deletePokemonUseCase: DeletePokemonUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const pokemon = await this.createPokemonUseCase.execute(req.body);
      return res.status(201).json(pokemon);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { tipo } = req.query;
      const pokemons = await this.listPokemonUseCase.execute({
        tipo: tipo ? String(tipo) : undefined,
      });
      return res.status(200).json(pokemons);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const pokemon = await this.getPokemonUseCase.execute(req.params.id as string);
      return res.status(200).json(pokemon);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const pokemon = await this.updatePokemonUseCase.execute(req.params.id as string, req.body);
      return res.status(200).json(pokemon);
    } catch (error: any) {
      const statusCode = error.message === 'Pokémon não encontrado.' ? 404 : 400;
      return res.status(statusCode).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deletePokemonUseCase.execute(req.params.id as string);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}