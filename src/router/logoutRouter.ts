import { Router } from 'express';
import * as loginController from '../controllers/loginController';

const router = Router();
router.post('/', loginController.logout);
export default router;
