import { ITrainerRepository } from '../../domain/repositories/trainer-repository';
import { NotFoundError } from '../../domain/errors/notFound.error';

export class GetTrainerTeamUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(trainerId: string) {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new NotFoundError('Treinador');
    }

    const team = await this.trainerRepository.getTeam(trainerId);

    return {
      trainer,
      team,
    };
  }
}