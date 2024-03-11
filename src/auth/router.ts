import { Router } from "express";
import { schemaBodyValidator } from "../middleware/validators";
import { signUpSchema, signInSchema } from "./schema"
import { signIn, signUp } from "./controller";

const router: Router = Router()

router.post("/signin", schemaBodyValidator(signInSchema), signIn)
router.post("/signup", schemaBodyValidator(signUpSchema), signUp)

export default router