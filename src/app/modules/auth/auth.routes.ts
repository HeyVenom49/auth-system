import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware.ts";
import { RegisterDto } from "./dto/register.dto.ts";
import * as controller from "./auth.controller.ts";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);

export default router;
