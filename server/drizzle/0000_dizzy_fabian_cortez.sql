CREATE TABLE `tasks` (
	`task_id` text PRIMARY KEY NOT NULL,
	`task_name` text,
	`description` text,
	`priority` text,
	`status` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
