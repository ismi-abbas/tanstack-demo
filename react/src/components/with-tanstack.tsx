import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../queries/index";
import Task from "./task";

export default function PriorityWithTanstack({
	priority,
}: {
	priority: string;
}) {
	// const query = useQuery({
	// 	queryKey: ["tasks", priority],
	// 	queryFn: () => getTasks({ priority }),
	// 	staleTime: 3 * 60 * 1000,
	// 	enabled: !!priority,
	// });

	const { data, error, isLoading } = useQuery({
		queryKey: ["tasks", priority],
		queryFn: () => getTasks({ priority }),
		staleTime: 3 * 60 * 1000,
		enabled: !!priority,
		// refetchOnWindowFocus: true
	});

	return (
		<>
			<div className="flex items-center justify-center mt-4">
				{isLoading && (
					<div className="w-12 h-12 rounded-full animate-spin border-4 border-yellow-500 border-t-transparent"></div>
				)}
				{error && <div>Error: {error.message}</div>}
			</div>

			<div className="flex flex-col gap-2 mt-4">
				{data?.tasks.map((task) => (
					<Task key={task.taskId} task={task} />
				))}
			</div>
		</>
	);
}
