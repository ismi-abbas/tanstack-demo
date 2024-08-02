import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SelectTask } from '@server/src/db/schema'

export async function fetchPaginatedTask(priority: string): Promise<{ tasks: SelectTask[]; hasMore: boolean }> {
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

export default function PaginatedQuery() {
	const [page, setPage] = useState(0)

	const { isPending, isError, error, data, isFetching, isPlaceholderData } = useQuery({
		queryKey: ['tasks', page],
		queryFn: () => fetchPaginatedTask('Low'),
		staleTime: 5 * 1000,
	})
	return (
		<div>
			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				<div>
					{data.tasks.map(task => (
						<p key={task.taskId}>{task.taskName}</p>
					))}
				</div>
			)}
			<span>Current Page: {page + 1}</span>

			<button onClick={() => setPage(old => Math.max(old - 1, 0))} disabled={page === 0}>
				Previous Page
			</button>

			<button
				onClick={() => {
					if (!isPlaceholderData && data?.hasMore) {
						setPage(old => old + 1)
					}
				}}
				// Disable the Next Page button until we know a next page is available
				disabled={isPlaceholderData || !data?.hasMore}>
				Next Page
			</button>
			{isFetching ? <span> Loading...</span> : null}
		</div>
	)
}

export const Route = createFileRoute('/tanstack-query/paginated-query')({
	component: PaginatedQuery,
})
