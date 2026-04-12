import {Router} from "express"
import { validateRegisterUser } from "../validator/auth.validator"

const router = Router()


router.post("/register",validateRegisterUser)

export default router