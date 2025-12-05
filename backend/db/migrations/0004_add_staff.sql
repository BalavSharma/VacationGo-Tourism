CREATE TABLE IF NOT EXISTS "staff" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "role" text NOT NULL,
    "photo_url" text,
    "facebook_url" text,
    "twitter_url" text,
    "instagram_url" text,
    "bio" text,
    "created_at" timestamp NOT NULL DEFAULT now()
);
