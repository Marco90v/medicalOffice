import express from 'express';

import * as workOutControllers from '../../controllers';
// import { validateToken } from '../../controllers/validateToken';

const router = express.Router();

// LOGIN
router.post('/login', workOutControllers.login);

export default router;