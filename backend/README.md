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
- Seed sample destinations (Paro, Thimphu, Punakha): `npm run seed`

### Booking schema (current)
- `bookings`: name, email, phone?, destination_id?, start_date?, end_date?, guests?, message?, status (pending|...), created_at
- `destinations`: slug, name, region?, summary?, hero_image_url?, created_at
- `inquiries`: name, email, phone?, message?, destination_id?, status, created_at

## Structure
- `src/server.ts` bootstraps Express and mounts routes.
- `src/config/env.ts` loads/validates environment variables.
- `src/db` holds Drizzle schema and client; extend `src/routes`, `src/controllers`, `src/services`, `src/models` as features grow.
- Bookings endpoint: `POST /api/bookings` validates input and stores a booking; optional `destinationSlug` is resolved to `destinations.id`.
