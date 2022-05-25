import express, { Router } from 'express';
import cors from 'cors';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import { handleError } from './utils/errors';
import './utils/db';
import { adRouter } from './router/ad.router';

const PORT = 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1000,
}));

app.use(express.json());

// Routers

const router = Router();

router.use('/ad', adRouter);
router.use(handleError);

app.use('/api', router);

app.listen(PORT, 'localhost', () => console.log('Server listen on http://localhost:5000'));
