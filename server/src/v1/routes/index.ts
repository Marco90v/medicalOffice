import express, { Request } from 'express';

import * as workOutControllers from '../../controllers';
import { validateToken } from '../../controllers/token';

const router = express.Router();

// LOGIN
router.post('/login', workOutControllers.login);

// SPECIALTY
router.get('/specialty', validateToken, workOutControllers.specialty);
router.post('/specialty', validateToken, workOutControllers.setSpecialty);
router.put('/specialty', validateToken, workOutControllers.updateSpecialty);
router.delete('/specialty', validateToken, workOutControllers.deleteSpecialty);

// SPECIALIST
router.get('/specialist/:idSpecialty', validateToken, workOutControllers.specialistByspecialty);

export default router;