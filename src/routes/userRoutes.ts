import express, { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
 
router.post('/', async (req: Request, res: Response) => { await UserController.create(req, res); });
export default router;
