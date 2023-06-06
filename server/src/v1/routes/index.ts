import express from 'express';

import * as workOutControllers from '../../controllers';
import { validateToken } from '../../controllers/token';
// import { validateToken } from '../../controllers/validateToken';

const router = express.Router();

// LOGIN
router.post('/login', workOutControllers.login);

router.get('/specialty', validateToken, workOutControllers.specialty);
router.post('/specialistByspecialty', validateToken, workOutControllers.specialistByspecialty);

export default router;