import express, { Express, Request, Response } from 'express';

import main from './services/conect';
import dotenv from 'dotenv';
import { pasientesSchema } from './model/schema';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {

  const db = await main();
  const pasientes = db.model('pasientes', pasientesSchema);
  const r = await pasientes.find({});
  db.disconnect();
  console.log(r);

  // res.send('Express + TypeScript Server.');
  res.json(r);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});




