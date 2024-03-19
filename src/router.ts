import { Router } from "express"
import authUserRouter from "./auth/router"
import contactRouter from "./contact/router"

const router = Router()

router.use("/auth", authUserRouter)
router.use("/", contactRouter)

export default router