import express from 'express';
import { Request, Response } from 'express';
import { v1Routes } from './v1';

export const routes = express.Router();

routes.use('/v1', v1Routes);
routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Azure Automation API', version: '1.0.0' });
});

