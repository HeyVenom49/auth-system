import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import { errorHandler } from "./app/common/middleware/error.middleware.ts";
import authRoute from "./app/modules/auth/auth.routes.ts";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/auth/", authRoute);
app.use(errorHandler);

export default app;
