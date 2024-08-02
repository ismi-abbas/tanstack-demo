import { SelectTask } from '@server/src/db/schema'
import { queryOptions } from '@tanstack/react-query'

export async function fetchGroups(priority: string): Promise<SelectTask[]> {
	try {
		const res = await fetch('http://localhost:3000/tasks/' + priority)

		if (!res.ok) {
			throw new Error('Network response was not ok')
		}

		const result = await res.json()
		return {
			...result,
			hasMore: result.length < 10,
		}
	} catch {
		throw new Error('Failed to fetch tasks')
	}
}

export const fetchTasksOptions = (priority: string) => {
	return queryOptions({
		queryKey: ['tasks', priority],
		queryFn: () => fetchGroups(priority),
		staleTime: 5 * 1000,
	})
}
