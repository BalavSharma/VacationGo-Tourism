import { pgTable, serial, text, timestamp, integer, date } from 'drizzle-orm/pg-core';
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

export const bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    contact: text('contact').notNull().default(''),
    destinationId: integer('destination_id').references(() => destinations.id),
    startDate: date('start_date'),
    endDate: date('end_date'),
    guests: integer('guests'),
    message: text('message'),
    status: text('status').notNull().default('pending'),
    createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow()
});

export const destinationRelations = relations(destinations, ({ many }) => ({
    inquiries: many(inquiries),
    bookings: many(bookings)
}));

export const inquiryRelations = relations(inquiries, ({ one }) => ({
    destination: one(destinations, {
        fields: [inquiries.destinationId],
        references: [destinations.id]
    })
}));

export const bookingRelations = relations(bookings, ({ one }) => ({
    destination: one(destinations, {
        fields: [bookings.destinationId],
        references: [destinations.id]
    })
}));

export const staff = pgTable('staff', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    role: text('role').notNull(),
    photoUrl: text('photo_url'),
    facebookUrl: text('facebook_url'),
    twitterUrl: text('twitter_url'),
    instagramUrl: text('instagram_url'),
    bio: text('bio'),
    createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow()
});

export const testimonials = pgTable('testimonials', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    role: text('role').notNull(),
    message: text('message').notNull(),
    photoUrl: text('photo_url'),
    createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow()
});
