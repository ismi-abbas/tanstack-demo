import { sql } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const tasks = sqliteTable('tasks', {
	taskId: text('task_id').primaryKey(),
	taskName: text('task_name'),
	description: text('description'),
	priority: text('priority'),
	status: text('status'),
	createdAt: text('created_at')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
})

export type InsertTask = typeof tasks.$inferInsert
export type SelectTask = typeof tasks.$inferSelect
