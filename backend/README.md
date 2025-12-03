# VacationGo Backend

Express + PostgreSQL backend using Drizzle ORM and TypeScript.

## Setup
- Install deps: `npm install`
- Configure env: copy `.env.example` to `.env` and set `DATABASE_URL`, `PORT` as needed.

## Development
- Start API in watch mode: `npm run dev`
- Build: `npm run build` then `npm start`

## Database & Migrations
- Update the schema in `src/db/schema.ts`, then generate SQL: `npm run db:generate`
- Apply migrations to your database: `npm run db:migrate`
- Migration output lives in `db/migrations` (uses `drizzle.config.ts` and `DATABASE_URL`)

## Structure
- `src/server.ts` bootstraps Express and mounts routes.
- `src/config/env.ts` loads/validates environment variables.
- `src/db` holds Drizzle schema and client; extend `src/routes`, `src/controllers`, `src/services`, `src/models` as features grow.
