import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import registerRouter from './registerRouter';
import loginRouter from './loginRouter';
import tokenRouter from './tokenRouter';
import logoutRouter from './logoutRouter';
import userRouter from './userRouter';
import contactRouter from './contactRouter';
import uploadRouter from './uploadRouter';

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
