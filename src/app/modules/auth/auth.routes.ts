import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware.ts";
import { RegisterDto } from "./dto/register.dto.ts";
import * as controller from "./auth.controller.ts";
import { LoginDto } from "./dto/login.dto.ts";
import { authenticate } from "./auth.middleware.ts";
import { ForgotPasswordDto } from "./dto/forgotPassword.dto.ts";
import { ResetPasswordDto } from "./dto/resetPassword.dto.ts";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);
router.post("/logout", authenticate, controller.logout);
router.get("/verify-email/:token", controller.verifyEmail);
router.post("/refresh-token", controller.refresh);
router.get("/me", authenticate, controller.getMe);
router.post(
  "/forgot-password",
  validate(ForgotPasswordDto),
  controller.forgotPassword,
);
router.put(
  "/reset-password/:token",
  validate(ResetPasswordDto),
  controller.resetPassword,
);

export default router;
