import { pgTable, text, serial, integer, boolean, timestamp, numeric, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Disaster data table
export const disasters = pgTable("disasters", {
  id: serial("id").primaryKey(),
  lat: numeric("lat").notNull(),
  lng: numeric("lng").notNull(),
  type: text("type").notNull(),
  severity: text("severity").notNull(), // "low", "medium", "high", "critical"
  details: text("details").notNull(),
});

// News/Updates table
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Volunteer registration table
export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  skills: text("skills").notNull(),
  availability: text("availability").notNull(),
});

// Help request table
export const helpRequests = pgTable("help_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  phone: text("phone").notNull(),
  emergencyType: text("emergency_type").notNull(),
  details: text("details").notNull(),
  people: integer("people").notNull(),
  status: text("status").default("pending").notNull(), // "pending", "assigned", "resolved"
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Insert schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDisasterSchema = createInsertSchema(disasters).pick({
  lat: true,
  lng: true,
  type: true,
  severity: true,
  details: true,
});

export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  content: true,
  category: true,
});

export const insertVolunteerSchema = createInsertSchema(volunteers).pick({
  name: true,
  email: true,
  phone: true,
  skills: true,
  availability: true,
});

export const insertHelpRequestSchema = createInsertSchema(helpRequests).pick({
  name: true,
  location: true,
  phone: true,
  emergencyType: true,
  details: true,
  people: true,
});

// Types for usage in the application
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDisaster = z.infer<typeof insertDisasterSchema>;
export type Disaster = typeof disasters.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;
export type Volunteer = typeof volunteers.$inferSelect;

export type InsertHelpRequest = z.infer<typeof insertHelpRequestSchema>;
export type HelpRequest = typeof helpRequests.$inferSelect;
