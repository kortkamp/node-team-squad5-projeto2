import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';

import errorHandling from './middlewares/errorHandling';
// import { morganMiddleware } from './middlewares/morganMiddleware';
// import '@shared/container';

const app = express();
const server = createServer(app);

// app.use(morganMiddleware);

app.use(cors());
app.use(express.json());



// app.use(routes);


app.use(errorHandling);

app.get('/', (req, res) => {
  return res.send('Node Team Squad #5 Projeto 2 - 2022');
});


export { server };
