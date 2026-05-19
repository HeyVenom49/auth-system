import * as service from "./auth.services.ts";
import ApiResponse from "../../common/utils/ApiResponse.ts";
import type { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<void> => {
  const user = await service.register(req.body);
  ApiResponse.created(res, "Register", user);
};

export { register };
