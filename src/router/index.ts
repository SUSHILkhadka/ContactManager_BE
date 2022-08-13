import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import registerRouter from './registerRouter';
import loginRouter from './loginRouter';
import tokenRouter from './tokenRouter';
import logoutRouter from './logoutRouter';
import userRouter from './userRouter';
import contactRouter from './contactRouter';

const router = Router();
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/token', tokenRouter);
router.use('/logout', logoutRouter);

router.use(authenticate);
router.use('/user', userRouter);
router.use('/contact', contactRouter);

export default router;