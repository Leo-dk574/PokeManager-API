import { Prisma } from '@prisma/client';
import { AppError } from '../../../domain/errors/app.error';

export class PrismaErrorMapper {
  static toAppError(error: unknown): AppError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new AppError('Registo já existente no banco de dados.', 409);
      }
    }
    return new AppError('Erro interno no servidor.', 500);
  }
}