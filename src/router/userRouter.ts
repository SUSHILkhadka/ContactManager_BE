import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
router.get('/', userController.getUserByEmail);
router.get('/all', userController.getAllUsers);
router.post('/', userController.createUser);
export default router;
