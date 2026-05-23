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
    maxAge: 5 * 24 * 60 * 60 * 1000,
    secure: process.env.ENVIRONMENT === "production",
  });
  res.cookie(accessToken, "accessToken", {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.ENVIRONMENT === "production",
  });

  ApiResponse.ok(res, "Login successful", user);
};

type VerifyEmailPattern = {
  token: string;
};

const verifyEmail = async (
  req: Request<VerifyEmailPattern>,
  res: Response,
): Promise<void> => {
  const user = await service.verifyEmail(req.params.token);
  ApiResponse.ok(res, "Token verifies successfully", user);
};

const logout = async (req: Request, res: Response): Promise<void> => {
  await service.logout(req.user.id);
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
};

export { register, login, verifyEmail, logout };
