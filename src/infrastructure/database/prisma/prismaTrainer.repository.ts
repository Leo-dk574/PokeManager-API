import { prisma } from './client';
import { ITrainerRepository, CreateCapturedPokemonInput } from '../../../domain/repositories/trainer-repository';
import { Trainer } from '../../../domain/entities/trainer';
import { CapturedPokemon } from '../../../domain/entities/captured-pokemon';

export class PrismaTrainerRepository implements ITrainerRepository {
  async create(nome: string): Promise<Trainer> {
    return await prisma.trainer.create({
      data: { nome },
    });
  }

  async findById(id: string): Promise<Trainer | null> {
    return await prisma.trainer.findUnique({
      where: { id },
    });
  }

  async countTeamMembers(trainerId: string): Promise<number> {
    return await prisma.capturedPokemon.count({
      where: { 
        trainerId,
        isActive: true,
      },
    });
  }

  async addPokemon(data: CreateCapturedPokemonInput): Promise<CapturedPokemon> {
    return await prisma.capturedPokemon.create({
      data: {
        trainerId: data.trainerId,
        pokeApiId: data.pokeApiId,
        nome: data.nome,
        imagemUrl: data.imagemUrl,
        tipos: data.tipos,
        hpBase: data.hpBase,
        ataqueBase: data.ataqueBase,
        defesaBase: data.defesaBase,
      },
    });
  }

  async getTeam(trainerId: string): Promise<CapturedPokemon[]> {
    return await prisma.capturedPokemon.findMany({
      where: { 
        trainerId,
        isActive: true,
      },
    });
  }
}