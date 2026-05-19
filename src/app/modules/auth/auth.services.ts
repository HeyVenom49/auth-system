import { eq, or } from "drizzle-orm";
import { db } from "../../common/config/db.config.ts";
import ApiError from "../../common/utils/ApiErrors.ts";
import { users } from "./auth.model.ts";
import type { RegisterDtoType } from "./dto/register.dto.ts";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../../common/utils/jwt.ts";
import { sendMail } from "../../common/config/email.config.ts";
import { verificationTemplate } from "../../common/utils/email.templates.ts";

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

export { register };
