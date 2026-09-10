import express from 'express';
import { pokemonRoutes } from '../infrastructure/http/routes/pokemon.routes';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());

// Ativa o Swagger
setupSwagger(app);

// Prefixo das rotas
app.use('/api/v1/pokemons', pokemonRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(' Servidor rodando na porta ${PORT}');
});