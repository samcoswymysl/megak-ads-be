import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleError} from './utils/errors';

const PORT = 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

//Routers

app.get('/', async (_req, _res, _next)=> {



})

app.use(handleError)

app.listen(PORT, 'localhost', () => console.log('Server listen on http://localhost:5000'));
