import type { Request, Response, NextFunction } from "express";
import { BaseDto } from "../dto/base.dto.ts";
import ApiError from "../utils/ApiErrors.ts";

export const validate = (dto: typeof BaseDto) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { success, error, value } = dto.validate(req.body);

    if (!success) {
      return next(ApiError.badRequest(error ?? "Invalid request body"));
    }

    req.body = value;
    next();
  };
};
