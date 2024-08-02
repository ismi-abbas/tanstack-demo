import { SelectTask } from '@server/src/db/schema'
import { queryOptions } from '@tanstack/react-query'

export async function fetchGroups(priority?: string, page?: string, limit?: string): Promise<SelectTask[]> {
	try {
		const url = new URL(`http://localhost:3000/tasks/${priority}`)
		if (page) {
			url.searchParams.append('page', page)
		} else if (limit) {
			url.searchParams.append('limit', limit)
		}

		const res = await fetch(url)

		if (!res.ok) {
			throw new Error('Network response was not ok')
		}

		const result = await res.json()
		return result
	} catch {
		throw new Error('Failed to fetch tasks')
	}
}

export const fetchTasksOptions = (priority: string) => {
	return queryOptions({
		queryKey: ['tasks', priority],
		queryFn: () => fetchGroups(priority, '1', '10'),
		staleTime: 5 * 1000 * 60,
	})
}
