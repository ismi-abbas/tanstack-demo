import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Fragment } from "react";

const routes = [
	{ url: "/tanstack-query", exact: true, text: "Simple Query" },
	{
		url: "/tanstack-query/paginated-query",
		exact: true,
		text: "Paginated Query",
	},
	{ url: "/tanstack-query/mutation", exact: false, text: "Mutation" },
	{
		url: "/tanstack-query/infinite-query",
		exact: true,
		text: "Infinite Query",
	},
];

export const Route = createFileRoute("/tanstack-query")({
	component: () => (
		<Fragment>
			<div className="flex gap-2 my-4 p-2">
				{routes.map(({ url, text, exact }, index) => {
					return (
						<Link
							key={index}
							to={url}
							activeProps={{ className: "font-bold" }}
							activeOptions={{ exact }}
						>
							{text}
						</Link>
					);
				})}
			</div>

			<div className="w-full px-20">
				<Outlet />
			</div>
		</Fragment>
	),
});
