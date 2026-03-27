import { pgTable, text, serial, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./auth";

export const boardTypeEnum = pgEnum("board_type", ["notice", "tools", "qa", "discussion"]);
export const assignmentStatusEnum = pgEnum("assignment_status", ["pending", "approved", "rejected"]);

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  boardType: boardTypeEnum("board_type").notNull(),
  authorId: text("author_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isPinned: boolean("is_pinned").notNull().default(false),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  externalUrl: text("external_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => postsTable.id, { onDelete: "cascade" }),
  authorId: text("author_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postLikesTable = pgTable("post_likes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => postsTable.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assignmentsTable = pgTable("assignments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  projectUrl: text("project_url"),
  screenshotUrl: text("screenshot_url"),
  status: assignmentStatusEnum("status").notNull().default("pending"),
  adminNote: text("admin_note"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
});

export const userProgressTable = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  completedSteps: text("completed_steps").notNull().default("[]"),
  isVerified: boolean("is_verified").notNull().default(false),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPostSchema = createInsertSchema(postsTable).omit({ id: true, authorId: true, viewCount: true, likeCount: true, createdAt: true, updatedAt: true });
export const insertCommentSchema = createInsertSchema(commentsTable).omit({ id: true, authorId: true, createdAt: true });
export const insertAssignmentSchema = createInsertSchema(assignmentsTable).omit({ id: true, userId: true, status: true, adminNote: true, submittedAt: true, reviewedAt: true });

export type Post = typeof postsTable.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Comment = typeof commentsTable.$inferSelect;
export type Assignment = typeof assignmentsTable.$inferSelect;
export type UserProgress = typeof userProgressTable.$inferSelect;
