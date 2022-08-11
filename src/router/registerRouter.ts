import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
router.all('/', userController.createUser);
export default router;
