import type { Response } from "express";

class ApiResponse {
  static ok(
    res: Response,
    message = "successful",
    data: unknown = null,
  ): Response {
    return res.status(200).json({
      status: true,
      message,
      data,
    });
  }

  static created(
    res: Response,
    message = "created",
    data: unknown = null,
  ): Response {
    return res.status(201).json({
      status: true,
      message,
      data,
    });
  }
}

export default ApiResponse;
