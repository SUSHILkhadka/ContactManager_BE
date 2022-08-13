import { Router } from 'express';
import * as loginController from '../controllers/loginController';

const router = Router();
router.post('/', loginController.getAccessToken);
// router.delete('/', loginController.logout);
export default router;
