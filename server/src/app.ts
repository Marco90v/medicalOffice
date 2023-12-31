import express, { Express, Request, Response } from 'express';
import cors from "cors";
import v1Router from './v1/routes';

// import main from './services/conect';
import dotenv from 'dotenv';
// import { pasientesSchema } from './model/schema';

import { getConnection, startConnection } from './services/conect';
import { IncomingMessage, Server, ServerResponse } from 'http';

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(cors({credentials: true}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {

  // const db = await main();
  // const collection = db.model('pasientes', pasientesSchema);
  // const data = await collection.find({});
  // db.disconnect();
  // console.log(data);

  res.send('Express + TypeScript Server.');
  // res.json(data);
});



app.use("/api/v1",v1Router);

let server:Server<typeof IncomingMessage, typeof ServerResponse>;
startConnection(()=>{
  server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

function close() {
  console.log( "\nGoing out.....");
  const db = getConnection();
  db.disconnect();
  server.close(()=>{
    process.exit(0);
  });
}

process.on('SIGINT', close);




