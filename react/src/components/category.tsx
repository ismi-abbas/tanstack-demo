import { useState, useEffect } from "react";
import { SelectTask } from "@server/src/db/schema";

export default function SimpleFetching({ priority }: { priority: string }) {
	const [data, setData] = useState<SelectTask[]>();
	const [error, setError] = useState<Error>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		let ignore = false;
		setIsLoading(true);
		fetch("http://localhost:3000/tasks?priority=" + priority)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch");
				}
				return res.json();
			})
			.then((d) => {
				if (!ignore) {
					setData(d);
					setError(undefined);
				}
			})
			.catch((e) => {
				if (!ignore) {
					setData(undefined);
					setError(e);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});

		// cleanup function
		return () => {
			ignore = true;
		};
	}, [priority]);

	return (
		<div className="max-w-md mx-auto mt-8">
			<h1 className="text-red-500 text-xl font-semibold">
				The Race Conditions 🏎️
			</h1>

			<h2 className="text-2xl font-bold mb-4 mt-4">Task List</h2>

			{priority && (
				<h3 className="text-lg font-semibold mb-2">Category: {priority}</h3>
			)}

			{error && (
				<div className="text-red-500">
					Error:{" "}
					{typeof error.message === "object"
						? JSON.stringify(error.message)
						: error.message}
				</div>
			)}

			{isLoading && (
				<div className="w-12 h-12 rounded-full animate-spin border-4 border-yellow-500 border-t-transparent"></div>
			)}
			<ul className="bg-white shadow-md rounded-lg overflow-hidden">
				{data &&
					data.tasks.map((task, index) => (
						<li
							key={index}
							className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
						>
							<div className="flex items-start gap-2 flex-col">
								<div
									className={`flex-grow ${task.status === "Done" ? "line-through text-gray-500" : "text-gray-800"}`}
								>
									{task.taskName}
								</div>
								<div>{task.priority}</div>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
}
