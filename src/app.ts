import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import authRoute from "./app/modules/auth/auth.routes.ts";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/auth/", authRoute);

export default app;
