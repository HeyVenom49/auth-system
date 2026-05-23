import "express";

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      role: UserRole;
      username: string;
      email: string;
    }

    interface Request {
      user: UserPayload;
    }
  }
}
