import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiErrors.ts";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
  });
};
