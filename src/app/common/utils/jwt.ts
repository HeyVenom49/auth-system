import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";

type AccessTokenType = {
  username: string;
  email: string;
  role: string;
};

type RefreshTokenType = {
  id: number;
};

export const generateVerificationToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  return { rawToken, hashedToken };
};

const getEnvVariable = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is missing`);
  }
  return value;
};

type TokenExpiresIn = NonNullable<SignOptions["expiresIn"]>;

const accessTokenSecret = getEnvVariable("JWT_ACCESS_TOKEN");
const accessTokenExpireIn = getEnvVariable(
  "JWT_ACCESS_TOKEN_EXPIREAT",
) as TokenExpiresIn;

const refreshTokenSecret = getEnvVariable("JWT_REFRESH_TOKEN");
const refreshTokenExpireIn = getEnvVariable(
  "JWT_REFRESH_TOKEN_EXPIREAT",
) as TokenExpiresIn;

const accessTokenSignOptions: SignOptions = { expiresIn: accessTokenExpireIn };
const refreshTokenSignOptions: SignOptions = {
  expiresIn: refreshTokenExpireIn,
};

export const generateAccessToken = (payload: AccessTokenType) => {
  return jwt.sign(payload, accessTokenSecret, accessTokenSignOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const generateRefreshToken = (payload: RefreshTokenType) => {
  return jwt.sign(payload, refreshTokenSecret, refreshTokenSignOptions);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};

export const generateHash = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateResetPasswordToken = () => {
  const rawToken = crypto.randomBytes(32).toString();
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return { rawToken, hashedToken };
};
