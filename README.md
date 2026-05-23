# Auth System

A TypeScript authentication API built with Express, PostgreSQL, Drizzle ORM, Bun, and JWT-based auth.

## Features

- User registration with schema validation
- Email verification flow with hashed verification tokens
- Login with access and refresh token generation
- Protected logout route
- PostgreSQL persistence with Drizzle ORM
- Docker Compose setup for local Postgres

## Tech Stack

- TypeScript
- Express 5
- Bun
- PostgreSQL
- Drizzle ORM
- JSON Web Tokens
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
```

## Prerequisites

- Bun
- Docker and Docker Compose
- PostgreSQL access if you are not using Docker

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5001
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

`CLIENT_URL` is used to generate the email verification link.

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Start PostgreSQL:

```bash
docker compose up -d
```

3. Generate and run migrations:

```bash
bun run db:generate
bun run db:migrate
```

4. Start the development server:

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
- `bun run db:migrate` - Apply migrations

## API Endpoints

Base path: `/api/auth`

### `POST /register`

Registers a new user and sends a verification email.

Request body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "customer"
}
```

### `POST /login`

Logs in a verified user.

Request body:

```json
{
  "username": "johndoe",
  "password": "secret123"
}
```

Notes:

- The `username` field also accepts an email address.
- The current implementation returns user data and also attempts to set auth cookies.

### `GET /verify-email/:token`

Verifies the email token sent during registration.

### `POST /logout`

Protected route that clears the stored refresh token for the authenticated user.

Authentication:

- Requires `Authorization: Bearer <access_token>`

## Notes

- Users must verify their email before they can log in.
- Verification tokens are stored as hashes in the database.
- The `users` table includes fields for verification, refresh tokens, and password reset metadata.
- The project currently contains a local `.env` file. If those credentials are real, rotate them before sharing or deploying this repository.
