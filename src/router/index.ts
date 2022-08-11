import { Router } from 'express';
// import loginRouter from "./loginRouter"
import userRouter from './userRouter';
const router = Router();
// router.use("/register",registerController);
// router.use("/login",loginRouter);
router.use('/user', userRouter);
// router.use("/logout",logoutController);

export default router;
