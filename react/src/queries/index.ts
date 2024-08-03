import { SelectTask } from "@server/src/db/schema";
import { queryOptions } from "@tanstack/react-query";

export async function getTasks({
	priority,
	page,
	limit,
}: {
	priority?: string;
	page?: string;
	limit?: string;
}): Promise<{ tasks: SelectTask[]; hasMore: boolean }> {
	const url = new URL(`http://localhost:3000/tasks`);
	try {
		if (page) {
			url.searchParams.append("page", page);
		} else if (limit) {
			url.searchParams.append("limit", limit);
		} else if (priority) {
			url.searchParams.append("priority", priority);
		}

		const res = await fetch(url);

		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const result = await res.json();
		return result;
	} catch {
		throw new Error("Failed to fetch tasks");
	}
}

export const getTasksOptions = (priority?: string) => {
	return queryOptions({
		queryKey: ["tasks", priority && priority],
		queryFn: () => getTasks({ priority }),
		staleTime: 5 * 1000 * 60,
	});
};
