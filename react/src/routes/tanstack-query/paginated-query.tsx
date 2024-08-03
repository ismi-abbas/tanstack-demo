import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SelectTask } from "@server/src/db/schema";
import { getTasks } from "../../queries/index";

async function fetchPaginatedTask(
	page: number,
): Promise<{ tasks: SelectTask[]; hasMore: boolean }> {
	try {
		const res = await fetch(`http://localhost:3000/tasks?page=${page}`);

		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const result = await res.json();

		return result;
	} catch {
		throw new Error("Failed to fetch tasks");
	}
}

export default function PaginatedQuery() {
	const [page, setPage] = useState(0);

	const queryClient = useQueryClient();

	const { isPending, isError, error, data, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["tasks", page],
			queryFn: () => getTasks({ page: page.toString() }),
			staleTime: 5 * 1000,
			placeholderData: keepPreviousData,
		});

	// Prefetch the next page!
	useEffect(() => {
		if (!isPlaceholderData && data?.hasMore) {
			queryClient.prefetchQuery({
				queryKey: ["tasks", page + 1],
				queryFn: () => fetchPaginatedTask(page + 1),
			});
		}
	}, [data, isPlaceholderData, page, queryClient]);

	return (
		<div className="mb-20">
			{isPending ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				<div className="p-2 gap-2 flex flex-col">
					{data.tasks.map((task) => (
						<div key={task.taskId} className="border p-2 rounded-md shadow-sm">
							<div>{task.taskId}</div>
							<div>{task.taskName}</div>
						</div>
					))}
				</div>
			)}
			{isFetching ? <span> Loading...</span> : null}

			<div>Current Page: {page + 1}</div>

			<button
				className="border rounded-md p-2 bg-orange-500 text-white"
				onClick={() => setPage((old) => Math.max(old - 1, 0))}
				disabled={page === 0}
			>
				Previous Page
			</button>

			<button
				className="border rounded-md p-2 bg-orange-500 text-white"
				onClick={() => {
					if (!isPlaceholderData && data?.hasMore) {
						setPage((old) => old + 1);
					}
				}}
				// Disable the Next Page button until we know a next page is available
				disabled={isPlaceholderData || !data?.hasMore}
			>
				Next Page
			</button>
		</div>
	);
}

export const Route = createFileRoute("/tanstack-query/paginated-query")({
	component: PaginatedQuery,
});
