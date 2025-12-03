import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const destinations = pgTable('destinations', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  region: text('region'),
  summary: text('summary'),
  heroImageUrl: text('hero_image_url'),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow()
});

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message'),
  destinationId: integer('destination_id').references(() => destinations.id),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow(),
  status: text('status').notNull().default('new')
});

export const destinationRelations = relations(destinations, ({ many }) => ({
  inquiries: many(inquiries)
}));

export const inquiryRelations = relations(inquiries, ({ one }) => ({
  destination: one(destinations, {
    fields: [inquiries.destinationId],
    references: [destinations.id]
  })
}));
