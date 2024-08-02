import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { InsertTask } from '@server/src/db/schema'
import { useState } from 'react'
import { fetchTasksOptions } from '../../queries'

type NewTask = Omit<InsertTask, 'taskId'>

export default function MutationSample() {
	const [task, setTask] = useState<NewTask>({})

	const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof NewTask) => {
		setTask(prev => ({
			...prev,
			[key]: e.target.value,
		}))
	}

	const { data, status, error, isFetching, isRefetching } = useQuery(fetchTasksOptions('low'))

	const { mutateAsync } = useMutation({
		mutationKey: ['addTask'],
		mutationFn: async (task: NewTask) => {
			try {
				;``
				const response = await fetch('http://localhost:3000/task', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(task),
				})

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				return await response.json()
			} catch (error) {
				throw new Error('Failed to add task ' + error)
			}
		},
	})

	const handleAddTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		mutateAsync({
			taskName: task.taskName || '',
			priority: task.priority || 'low',
			description: task.description || '',
			status: task.status || 'pending',
		})
	}

	return (
		<div className="flex flex-col mt-4">
			<h1 className="text-3xl font-bold">Sample Using useMutation</h1>

			<form action="">
				<div className="mt-4 flex gap-4">
					<input
						type="text"
						placeholder="Enter a task"
						className="border p-2"
						value={task.taskName || ''}
						onChange={e => handleTaskChange(e, 'taskName')}
					/>
					<input
						type="text"
						placeholder="Enter a task"
						className="border p-2"
						value={task.description || ''}
						onChange={e => handleTaskChange(e, 'description')}
					/>
					<select
						className="border p-2"
						value={task.priority || ''}
						onChange={e => {
							setTask(prev => ({
								...prev,
								priority: e.target.value,
							}))

							console.log(e.target.value)
						}}>
						<option value="high">High</option>
						<option value="medium">Medium</option>
						<option value="low">Low</option>
					</select>
					<button className="border p-2" onClick={e => handleAddTask(e)}>
						Add Task
					</button>
				</div>
			</form>

			{status === 'pending' ? (
				<span>Loading...</span>
			) : status === 'error' ? (
				<span>Error: {error.message}</span>
			) : (
				<>
					{isFetching ? <div>Refreshing...</div> : null}
					{isRefetching ? <div>Refetching...</div> : null}
					<div className="mt-4 gap-2 flex flex-col">
						{data.map(todo => (
							<div key={todo.taskId} className="border">
								ID:<span className="font-bold">{todo.taskId}</span> {todo.taskName} - {todo.priority}
								<div>{todo.createdAt}</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export const Route = createFileRoute('/tanstack-query/mutation')({
	component: MutationSample,
})
