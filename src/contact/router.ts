import { Router } from "express"
import { authValidator } from "../middleware/auth"

const router = Router()

router.get("/test", authValidator(), (_req, res) => {
    return res.status(200).json({ message: "ok" })
})

export default router