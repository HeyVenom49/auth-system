import ApiError from "../../common/utils/ApiErrors.ts";
import { users } from "./auth.model.ts";
import { verifyAccessToken } from "../../common/utils/jwt.ts";
import type { Request, Response, NextFunction } from "express";
import { db } from "../../common/config/db.config.ts";
import { eq } from "drizzle-orm";
import type { JwtPayloadType } from "../../../types/auth.ts";

const authenticate = async (
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  const auth = req.headers.authorization;
  let token;
  if (auth?.toLowerCase().startsWith("bearer ")) token = auth.slice(7).trim();

  if (!token) throw ApiError.unauthorized("Not authenticated");

  let decoded;

  try {
    decoded = verifyAccessToken(token) as JwtPayloadType;
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }

  const [user] = await db.select().from(users).where(eq(users.id, decoded.id));

  if (!user) throw ApiError.unauthorized("User no longer exists");

  req.user = {
    id: user.id,
    role: user.role,
    username: user.username,
    email: user.email,
  };
  next();
};

export { authenticate };
