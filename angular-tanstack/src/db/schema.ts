import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  taskId: serial('task_id').primaryKey().notNull(),
  taskName: text('task_name'),
  description: text('description'),
  priority: text('priority'),
  status: text('status'),
});

export const notes = pgTable('note', {
  id: uuid('id').defaultRandom().primaryKey(),
  note: text('note').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Note = InferSelectModel<typeof notes>;
export type NewNote = InferInsertModel<typeof notes>;
export type Task = InferSelectModel<typeof tasks>;
export type NewTask = InferInsertModel<typeof tasks>;
