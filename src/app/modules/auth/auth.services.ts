import { eq, or } from "drizzle-orm";
import { db } from "../../common/config/db.config.ts";
import ApiError from "../../common/utils/ApiErrors.ts";
import { users } from "./auth.model.ts";
import type { RegisterDtoType } from "./dto/register.dto.ts";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  generateHash,
  verifyRefreshToken,
} from "../../common/utils/jwt.ts";
import { sendMail } from "../../common/config/email.config.ts";
import { verificationTemplate } from "../../common/utils/email.templates.ts";
import type { LoginDtoType } from "./dto/login.dto.ts";
import type { JwtPayloadType } from "../../../types/auth.ts";

const register = async ({
  username,
  email,
  password,
  role,
}: RegisterDtoType) => {
  const existing = await db
    .select()
    .from(users)
    .where(or(eq(users.email, email), eq(users.username, username)));

  if (existing.length > 0)
    throw ApiError.conflict("Username or email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rawToken, hashedToken } = generateVerificationToken();

  const userData = {
    username,
    email,
    password: hashedPassword,
    role,
    verificationToken: hashedToken,
    verificationTokenExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
  };

  const html = verificationTemplate({
    username,
    verificationUrl: `${process.env.CLIENT_URL}/verify/${rawToken}`,
  });

  sendMail({
    to: email,
    subject: "Verify your email",
    html,
  });

  const [user] = await db.insert(users).values(userData).returning({
    id: users.id,
    email: users.email,
    username: users.username,
    role: users.role,
  });
  return user;
};

const signin = async ({ username, password }: LoginDtoType) => {
  const [user] = await db
    .select()
    .from(users)
    .where(
      username.includes("@")
        ? eq(users.email, username)
        : eq(users.username, username),
    )
    .limit(1);

  if (!user) throw ApiError.badRequest("Invalid credentials");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) throw ApiError.badRequest("Invalid credentials");

  if (!user.isVerified)
    throw ApiError.forbidden("Please verify your email before login");

  const accessToken = generateAccessToken({
    username: user.username,
    email: user.email,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({ id: user.id });

  const hashedRefreshToken = generateHash(refreshToken);

  await db
    .update(users)
    .set({
      refreshToken: hashedRefreshToken,

      refreshTokenExpiresAt: new Date(Date.now() * 5 * 24 * 60 * 60 * 1000),
    })
    .where(eq(users.id, user.id));

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

const verifyEmail = async (token: string) => {
  const trimmed = String(token).trim();

  if (!trimmed)
    throw ApiError.badRequest("Invalid or expire verification token");

  const hashedToken = generateHash(trimmed);
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.verificationToken, hashedToken))
    .limit(1);

  if (!user) throw ApiError.badRequest("Invalid Token");

  if (
    !user.verificationTokenExpiresAt ||
    user.verificationTokenExpiresAt < new Date()
  ) {
    throw ApiError.badRequest("Token is expired");
  }

  await db
    .update(users)
    .set({
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiresAt: null,
    })
    .where(eq(users.id, user.id));
  return { user };
};

const logout = async (id: number) => {
  await db
    .update(users)
    .set({
      refreshToken: null,
      refreshTokenExpiresAt: null,
    })
    .where(eq(users.id, id));
};

const refresh = async (token: string) => {
  if (!token) throw ApiError.unauthorized("Refresh Token missing");

  const decoded = verifyRefreshToken(token) as JwtPayloadType;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, decoded.id))
    .limit(1);

  if (!user) throw ApiError.unauthorized("User not found");

  if (!user.refreshToken || user.refreshToken !== generateHash(token))
    throw ApiError.unauthorized("Invalid refresh token");

  const accessToken = generateAccessToken({
    username: user.username,
    email: user.email,
    role: user.role,
  });

  return { accessToken };
};

const getMe = async (id: number) => {
  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
      isVerified: users.isVerified,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

export { register, signin, verifyEmail, logout, refresh, getMe };
