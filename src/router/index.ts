import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import contactRouter from './contactRouter';
import loginRouter from './loginRouter';
import logoutRouter from './logoutRouter';
import registerRouter from './registerRouter';
import tokenRouter from './tokenRouter';
import uploadRouter from './uploadRouter';
import userRouter from './userRouter';

const router = Router();
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/token', tokenRouter);
router.use('/logout', logoutRouter);
router.use('/upload', uploadRouter);

router.use(authenticate);
router.use('/user', userRouter);
router.use('/contacts', contactRouter);

export default router;
