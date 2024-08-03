import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function InfiniteQuery() {
	const { ref, inView } = useInView();

	const {
		status,
		data,
		error,
		isFetching,
		isFetchingNextPage,
		isFetchingPreviousPage,
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
	} = useInfiniteQuery({
		queryKey: ["tasks-infinite"],
		queryFn: async ({
			pageParam,
		}): Promise<{
			data: Array<{ name: string; id: number }>;
			previousId: number;
			nextId: number;
		}> => {
			const response = await fetch(
				`http://localhost:3000/tasks/infinite?cursor=${pageParam}`,
			);
			return await response.json();
		},
		initialPageParam: 0,
		getPreviousPageParam: (firstPage) => firstPage.previousId,
		getNextPageParam: (lastPage) => lastPage.nextId,
	});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<div>
			<h1 className="text-3xl font-bold">Sample Infinite Query</h1>

			{status === "pending" ? (
				<p>Loading...</p>
			) : status === "error" ? (
				<span>Error: {error.message}</span>
			) : (
				<>
					<div>
						<button
							onClick={() => fetchPreviousPage()}
							disabled={!hasPreviousPage || isFetchingPreviousPage}
						>
							{isFetchingPreviousPage
								? "Loading more..."
								: hasPreviousPage
									? "Load Older"
									: "Nothing more to load"}
						</button>
					</div>
					{data.pages.map((page) => (
						<div className="flex flex-col gap-4" key={page.nextId}>
							{page.data.map((project) => (
								<div
									style={{
										border: "1px solid gray",
										borderRadius: "5px",
										padding: "2rem 1rem",
									}}
									key={project.id}
								>
									{project.name}
								</div>
							))}
						</div>
					))}
					<div>
						<button
							ref={ref}
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}
						>
							{isFetchingNextPage
								? "Loading more..."
								: hasNextPage
									? "Load Newer"
									: "Nothing more to load"}
						</button>
					</div>
					<div>
						{isFetching && !isFetchingNextPage
							? "Background Updating..."
							: null}
					</div>
				</>
			)}
		</div>
	);
}

export const Route = createFileRoute("/tanstack-query/infinite-query")({
	component: InfiniteQuery,
});
