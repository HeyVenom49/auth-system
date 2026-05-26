# Auth System

Authentication API built with TypeScript, Express 5, PostgreSQL, Drizzle ORM, Bun, JWT, and Nodemailer.

## Features

- User registration with ArkType request validation
- Email verification with hashed verification tokens
- Login with access token and refresh token flow
- Protected profile lookup with `/me`
- Logout with stored refresh token invalidation
- Forgot-password and reset-password flow
- PostgreSQL persistence through Drizzle ORM
- Docker Compose support for local database setup

## Tech Stack

- TypeScript
- Express 5
- Bun
- PostgreSQL
- Drizzle ORM
- JSON Web Token
- Nodemailer
- ArkType

## Project Structure

```text
src/
  app/
    common/
      config/
      dto/
      middleware/
      utils/
    modules/
      auth/
        dto/
        auth.controller.ts
        auth.middleware.ts
        auth.model.ts
        auth.routes.ts
        auth.services.ts
  types/
  app.ts
  index.ts
docker-compose.yml
drizzle.config.js
```

## Prerequisites

- Bun
- Docker and Docker Compose
- PostgreSQL access if you are not using Docker

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=7000|5000
ENVIRONMENT=development

POSTGRES_USERNAME=admin
POSTGRES_PASSWORD=your_password
POSTGRES_DB=authdb

DATABASE_URL=postgresql://admin:your_password@localhost:5433/authdb

JWT_ACCESS_TOKEN=your_access_secret
JWT_ACCESS_TOKEN_EXPIREAT=15m
JWT_REFRESH_TOKEN=your_refresh_secret
JWT_REFRESH_TOKEN_EXPIREAT=5d

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_app_password

CLIENT_URL=http://localhost:5173
```

`CLIENT_URL` is used to build email verification and password reset links.

## Getting Started

1. Install dependencies.

```bash
bun install
```

2. Start PostgreSQL.

```bash
docker compose up -d
```

3. Generate and apply migrations.

```bash
bun run db:generate
bun run db:migrate
```

4. Start the development server.

```bash
bun run dev
```

The API starts after a successful database connection.

## Available Scripts

- `bun run dev` - Build in watch mode and run the server
- `bun run build` - Compile TypeScript into `dist/`
- `bun run start` - Run the compiled server
- `bun run studio` - Open Drizzle Studio
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Apply Drizzle migrations

## API Overview

Base URL: `http://localhost:7000/api/auth`

All responses use this shape:

```json
{
  "status": true,
  "message": "successful",
  "data": {}
}
```

## Auth Endpoints

### `POST /register`

Create a new user and send an email verification link.

Request body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "customer"
}
```

Notes:

- `role` currently accepts only `"customer"`.
- Email verification is required before login.

### `POST /login`

Login with username or email plus password.

Request body:

```json
{
  "username": "johndoe",
  "password": "secret123"
}
```

Notes:

- The `username` field also accepts an email address.
- The service returns user details and generates both access and refresh tokens.

### `GET /verify-email/:token`

Verify the email token sent during registration.

### `POST /refresh-token`

Issue a fresh access token using the refresh token stored in cookies.

### `GET /me`

Return the currently authenticated user profile.

Authentication:

- Requires `Authorization: Bearer <access_token>`

### `POST /logout`

Invalidate the saved refresh token and clear auth cookies.

Authentication:

- Requires `Authorization: Bearer <access_token>`

### `POST /forgot-password`

Start the password reset flow.

Request body:

```json
{
  "email": "john@example.com"
}
```

### `PUT /reset-password/:token`

Reset the user password with a valid reset token.

Request body:

```json
{
  "password": "Secret7"
}
```

Password rules:

- Minimum 6 characters
- Must include at least one uppercase letter
- Must include at least one digit from `0` to `7`

## Auth Flow Summary

1. Register a user with `/register`.
2. Open the verification link sent by email.
3. Log in with `/login`.
4. Use the access token for protected routes such as `/me` and `/logout`.
5. Use `/refresh-token` when the access token expires.
6. Use `/forgot-password` and `/reset-password/:token` for password recovery.

## Notes

- Verification, refresh, and password reset tokens are stored as hashes in the database.
- The server reads cookies with `cookie-parser` and expects bearer auth for protected routes.
- The app listens on `PORT` and defaults to `7000|5000` when the variable is missing.
- If the local `.env` contains real secrets, rotate them before sharing or deploying the project.
