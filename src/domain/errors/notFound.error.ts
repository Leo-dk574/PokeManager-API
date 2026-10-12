import { AppError } from './app.error';

export class NotFoundError extends AppError {
  constructor(recurso: string) {
    super(`${recurso} não encontrado(a).`, 404);
  }
}