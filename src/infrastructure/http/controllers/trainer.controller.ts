import { Request, Response, NextFunction } from 'express';
import { PrismaTrainerRepository } from '../../database/prisma/prismaTrainer.repository';
import { PokeApiClient } from '../poke-api.client';
import { CreateTrainerUseCase } from '../../../application/use-cases/CreateTrainer';
import { CapturePokemonUseCase } from '../../../application/use-cases/CapturePokemon';
import { GetTrainerTeamUseCase } from '../../../application/use-cases/ListTeam';

export class TrainerController {
  private trainerRepository = new PrismaTrainerRepository();
  private pokeApiClient = new PokeApiClient();

  private createTrainerUseCase = new CreateTrainerUseCase(this.trainerRepository);
  private capturePokemonUseCase = new CapturePokemonUseCase(this.trainerRepository, this.pokeApiClient);
  private getTrainerTeamUseCase = new GetTrainerTeamUseCase(this.trainerRepository);

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome } = req.body;
      const trainer = await this.createTrainerUseCase.execute(nome);
      return res.status(201).json(trainer);
    } catch (error) {
      next(error);
    }
  };

  capture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { pokemonName } = req.body;
      const captured = await this.capturePokemonUseCase.execute(id as string, pokemonName);
      return res.status(201).json(captured);
    } catch (error) {
      next(error);
    }
  };

  getTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.getTrainerTeamUseCase.execute(id as string);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}