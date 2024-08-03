import { SelectTask } from "@server/src/db/schema";
import { format } from "date-fns";

const formatDate = (date: string) => format(new Date(date), "yyyy-MM-dd");

export default function Task({ task }: { task: SelectTask }) {
	return (
		<div key={task.taskId} className="border p-2 rounded-md">
			<div>ID: {task.taskId}</div>
			<div className="capitalize">Name: {task.taskName}</div>
			<div className="capitalize">Priority: {task.priority}</div>
			<div>Date Added: {formatDate(new Date(task.createdAt).toString())}</div>
		</div>
	);
}
