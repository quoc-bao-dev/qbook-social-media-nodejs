import { Router } from "express";
import authRouter from "./auth.route";
import commentRouter from "./comment.route";
import followRouter from "./follow.route";
import friendRouter from "./friend.route";
import postRouter from "./post.route";
import storyRouter from "./story.route";
import uploadRouter from "./upload.route";
import userRouter from "./user.route";

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/post', commentRouter)
router.use('/friend', friendRouter)
router.use('/friend', followRouter)
router.use('/story', storyRouter)
router.use('/upload', uploadRouter)

export default router