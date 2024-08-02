import data from './MOCK_DATA.json'
import { db } from './src/db'
import { tasks } from './src/db/schema'

async function insertData() {
	for (const item of data) {
		await db
			.insert(tasks)
			.values({
				taskId: item.task_id,
				taskName: item.task_name,
				description: item.description,
				priority: item.priority,
				status: item.status,
				createdAt: item.created_at,
			})
			.onConflictDoNothing()
	}
	console.log('Data insertion completed.')
}

insertData().catch(console.error)
