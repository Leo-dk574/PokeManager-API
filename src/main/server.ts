import express, { Request, Response, NextFunction } from 'express';
import { pokemonRoutes } from '../infrastructure/http/routes/pokemon.routes'; // CRUD Legado (Etapa 1)
import { trainerRoutes } from '../infrastructure/http/routes/trainer.routes';   // Treinadores e Capturas (Etapa 2)
import { pokedexRoutes } from '../infrastructure/http/routes/pokedex.routes';   // Busca PokéAPI (Etapa 2)
import { setupSwagger } from './config/swagger';
import { AppError } from '../domain/errors/app.error';

const app = express();

app.use(express.json());

setupSwagger(app);

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'PokeManager API está online!',
    docs: '/swagger',
  });
});

app.use('/api/v1/pokemons', pokemonRoutes);
app.use('/api/v1', trainerRoutes);
app.use('/api/v1', pokedexRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('Erro não tratado:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor.',
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
  console.log(`Swagger UI disponível em: http://localhost:${PORT}/swagger`);
});