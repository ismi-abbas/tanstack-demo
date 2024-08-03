import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../queries/index";
import Task from "./task";

export default function PriorityWithTanstack({
	priority,
}: {
	priority: string;
}) {
	const query = useQuery({
		queryKey: ["tasks", priority],
		queryFn: () => getTasks({ priority }),
		staleTime: 3 * 60 * 1000,
		enabled: !!priority,
	});

	return (
		<>
			<div className="flex items-center justify-center mt-4">
				{query.isLoading && (
					<div className="w-12 h-12 rounded-full animate-spin border-4 border-yellow-500 border-t-transparent"></div>
				)}
				{query.error && <div>Error: {query.error.message}</div>}
			</div>

			<div className="flex flex-col gap-2 mt-4">
				{query.data?.tasks.map((task) => (
					<Task key={task.taskId} task={task} />
				))}
			</div>
		</>
	);
}
