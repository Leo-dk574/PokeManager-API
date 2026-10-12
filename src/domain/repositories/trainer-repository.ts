import { Trainer } from '../entities/trainer';
import { CapturedPokemon } from '../entities/captured-pokemon';

export type CreateCapturedPokemonInput = Omit<CapturedPokemon, 'id' | 'isActive'>;

export interface ITrainerRepository {
  create(nome: string): Promise<Trainer>;
  findById(id: string): Promise<Trainer | null>;
  countTeamMembers(trainerId: string): Promise<number>;
  addPokemon(data: CreateCapturedPokemonInput): Promise<CapturedPokemon>;
  getTeam(trainerId: string): Promise<CapturedPokemon[]>;
}