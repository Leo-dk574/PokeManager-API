import { AppError } from './app.error';

export class TeamFullError extends AppError {
  constructor() {
    super('O treinador já possui o limite máximo de 6 Pokémons no time ativo.', 400);
  }
}