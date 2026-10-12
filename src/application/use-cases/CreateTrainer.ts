import { ITrainerRepository } from '../../domain/repositories/trainer-repository';
import { Trainer } from '../../domain/entities/trainer';
import { AppError } from '../../domain/errors/app.error';

export class CreateTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(nome: string): Promise<Trainer> {
    if (!nome || nome.trim() === '') {
      throw new AppError('O nome do treinador é obrigatório.', 400);
    }

    return await this.trainerRepository.create(nome.trim());
  }
}