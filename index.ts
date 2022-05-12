import express from 'express';
import cors from 'cors';
import 'express-async-errors';

const PORT = 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.listen(PORT, 'localhost', () => console.log('Server listen on http://localhost:5000'));
