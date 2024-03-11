import { Router } from "express"
import authUser from "./auth/router"

const router = Router()

router.use("/", authUser)
// kjh
export default router