import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware.ts";
import { RegisterDto } from "./dto/register.dto.ts";
import * as controller from "./auth.controller.ts";
import { LoginDto } from "./dto/login.dto.ts";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);
router.get("/verify-email/:token", controller.verifyEmail);

export default router;
