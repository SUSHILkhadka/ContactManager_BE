import { Router } from 'express';
import * as loginController from '../controllers/LoginController';

const router = Router();
router.all('/', loginController.login);
export default router;
