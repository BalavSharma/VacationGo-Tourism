CREATE TABLE IF NOT EXISTS "testimonials" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "role" text NOT NULL,
    "message" text NOT NULL,
    "photo_url" text,
    "created_at" timestamp NOT NULL DEFAULT now()
);
