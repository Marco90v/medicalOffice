import express, { Request } from 'express';

import * as workOutControllers from '../../controllers';
import { validateToken } from '../../controllers/token';

const router = express.Router();

// LOGIN
router.post('/login', workOutControllers.login);
router.post('/newLogin', workOutControllers.newLogin);
router.get('/login',validateToken, workOutControllers.getLogin);
router.put('/login',validateToken, workOutControllers.updateLogin);
router.delete('/login',validateToken, workOutControllers.deleteLogin);

// SPECIALTY
router.get('/specialty', validateToken, workOutControllers.specialty);
router.post('/specialty', validateToken, workOutControllers.setSpecialty);
router.put('/specialty', validateToken, workOutControllers.updateSpecialty);
router.delete('/specialty', validateToken, workOutControllers.deleteSpecialty);

// SPECIALIST
router.get('/specialist', validateToken, workOutControllers.specialist);
router.get('/specialist/:idSpecialty', validateToken, workOutControllers.specialistByspecialty);
router.post('/specialist', validateToken, workOutControllers.setSpecialist);
router.put('/specialist', validateToken, workOutControllers.updateSpecialist);
router.delete('/specialist', validateToken, workOutControllers.deleteSpecialist);

// PATIENT
router.get('/patient/:dni', validateToken, workOutControllers.getPatient);
router.post('/patient', validateToken, workOutControllers.setPatient);

//QUEUE
router.get('/queue', validateToken, workOutControllers.getQueue)


export default router;