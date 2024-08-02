import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { db } from './db'
import { InsertTask, tasks } from './db/schema'
import { asc, desc, eq } from 'drizzle-orm'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
	'*',
	cors({
		origin: '*',
	}),
)

app
	.get('/', c => c.text('Hello Hono!'))
	.get('/tasks', async c => {
		const page = parseInt(c.req.query('page') || '0')
		const limit = 10 // Fixed limit of 10 items per page

		try {
			const allTasks = await db
				.select()
				.from(tasks)
				.limit(limit)
				.offset(page * limit)
			// .orderBy(asc(tasks.taskId))

			const hasMoreCheck = await db
				.select()
				.from(tasks)
				.limit(1)
				.offset((page + 1) * limit)

			const total = await db.select().from(tasks)
			const totalPages = Math.ceil(total.length / limit)

			// Simulate slower response
			await new Promise(resolve => setTimeout(resolve, 1000))

			return c.json({
				tasks: allTasks,
				hasMore: hasMoreCheck.length > 0,
				totalPages,
			})
		} catch (error) {
			return c.json({ error: 'Failed to fetch tasks' })
		}
	})
	.get('/tasks/:priority', async c => {
		const priority = c.req.param('priority')
		const page = parseInt(c.req.query('page') || '0')
		const limit = 10

		if (priority === 'High') {
			throw new Error('Server Error')
		}

		let results = []

		if (page > 0) {
			results = await db
				.select()
				.from(tasks)
				.where(eq(tasks.priority, priority))
				.limit(limit)
				.offset(page * limit)
				.orderBy(asc(tasks.createdAt))
		} else {
			results = await db.select().from(tasks).where(eq(tasks.priority, priority))
		}

		return c.json(results)
	})
	.post('/task', async c => {
		try {
			const task = (await c.req.json()) as InsertTask

			const newTask = await db.insert(tasks).values({
				...task,
				taskId: (Math.floor(Math.random() * 9000) + 1000).toFixed(2),
			})

			return c.json(newTask)
		} catch (error) {
			return c.json({ error: 'Failed to add task' })
		}
	})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
	fetch: app.fetch,
	port,
})
