import { Router } from 'express';
import { TrainerController } from '../controllers/trainer.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { 
  createTrainerSchema, 
  capturePokemonBodySchema, 
  trainerIdParamSchema 
} from '../schemas/trainer.schema';

const trainerRoutes = Router();
const controller = new TrainerController();

trainerRoutes.post(
  '/trainers',
  /* 
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Cria um novo treinador'
  */
  validateRequest({ body: createTrainerSchema }),
  controller.create
);

trainerRoutes.post(
  '/trainers/:id/captures',
  /* 
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Regista a captura de um Pokémon'
  */
  validateRequest({ params: trainerIdParamSchema, body: capturePokemonBodySchema }),
  controller.capture
);

trainerRoutes.get(
  '/trainers/:id/team',
  /* 
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Lista a equipa do treinador'
  */
  validateRequest({ params: trainerIdParamSchema }),
  controller.getTeam
);

export { trainerRoutes };