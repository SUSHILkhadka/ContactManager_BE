import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import registerRouter from "./registerRouter";
import loginRouter from "./loginRouter";
import tokenRouter from "./tokenRouter"
import userRouter from './userRouter';

const router = Router();
router.use("/register",registerRouter);
router.use("/login",loginRouter);
router.use("/token",tokenRouter);
router.use("/logout",loginRouter);

router.use(authenticate);
router.use('/user', userRouter);
// router.use("/logout",logoutController);

export default router;
