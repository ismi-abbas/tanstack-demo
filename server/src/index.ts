import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { db } from "./db";
import { InsertTask, tasks } from "./db/schema";
import { asc, desc, eq, lt } from "drizzle-orm";
import { cors } from "hono/cors";
import { v4 } from "uuid";

const app = new Hono();

app.use("*", cors({ origin: "*" }));

app
	.get("/", (c) => c.text("Hello Hono!"))
	.get("/tasks", async (c) => {
		const currentPage = parseInt(c.req.query("page") || "0");
		const pageSize = parseInt(c.req.query("limit") || "10");
		const priority = c.req.query("priority");

		try {
			let allTasks = await db
				.select()
				.from(tasks)
				.limit(pageSize)
				.offset(currentPage * pageSize)
				.orderBy(desc(tasks.createdAt));

			if (priority) {
				allTasks = await db
					.select()
					.from(tasks)
					.limit(pageSize)
					.offset(currentPage * pageSize)
					.where(eq(tasks.priority, priority))
					.orderBy(desc(tasks.createdAt));
			}

			const hasMoreCheck = await db
				.select()
				.from(tasks)
				.limit(1)
				.offset((currentPage + 1) * pageSize);

			const total = await db.select().from(tasks);
			const totalPages = Math.ceil(total.length / pageSize);

			// Simulate slower response
			// await new Promise((resolve) => setTimeout(resolve, 1000));

			return c.json({
				tasks: allTasks,
				hasMore: hasMoreCheck.length > 0,
				totalPages,
			});
		} catch (error) {
			return c.json({ error: "Failed to fetch tasks" });
		}
	})
	.get("/tasks/infinite", async (c) => {
		const cursor = parseInt(c.req.query("curser") || "0");
		const pageSize = 5;

		const data = Array(pageSize)
			.fill(0)
			.map((_, i) => {
				return {
					name: `Project ${i + cursor} (server time: ${Date.now()})`,
					id: i + cursor,
				};
			});

		const nextId = cursor < 10 ? data[data.length - 1].id + 1 : null;
		const previousId = cursor > -10 ? data[0].id - pageSize : null;

		Promise.resolve(new Promise((resolve) => setTimeout(resolve, 1000)));

		return c.json({ data, nextId, previousId });
	})
	.post("/task", async (c) => {
		try {
			const task = (await c.req.json()) as InsertTask;

			const newTask = await db.insert(tasks).values({
				...task,
				taskId: v4(),
			});

			return c.json(newTask);
		} catch (error) {
			return c.json({ error: "Failed to add task" });
		}
	});

const port = 3000;

serve({
	fetch: app.fetch,
	port,
});

console.log(`Server is running on port ${port}`);
