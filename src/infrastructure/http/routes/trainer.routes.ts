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
  validateRequest({ body: createTrainerSchema }),
  controller.create
);

trainerRoutes.post(
  '/trainers/:id/captures',
  validateRequest({ params: trainerIdParamSchema, body: capturePokemonBodySchema }),
  controller.capture
);

trainerRoutes.get(
  '/trainers/:id/team',
  validateRequest({ params: trainerIdParamSchema }),
  controller.getTeam
);

export { trainerRoutes };