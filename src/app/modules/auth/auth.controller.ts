import * as service from "./auth.services.ts";
import ApiResponse from "../../common/utils/ApiResponse.ts";
import type { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<void> => {
  const user = await service.register(req.body);
  ApiResponse.created(res, "Register", user);
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { accessToken, refreshToken, user } = await service.signin(req.body);
  res.cookie(refreshToken, "refreshToken", {
    httpOnly: true,
    maxAge: 5 * 24 * 60 * 1000,
    secure: process.env.ENVIRONMENT === "production",
  });

  ApiResponse.ok(res, "Login successful", { user, accessToken });
};

export { register, login };
