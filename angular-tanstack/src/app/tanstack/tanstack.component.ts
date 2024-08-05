import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tanstack',
  standalone: true,
  imports: [],
  templateUrl: './tanstack.component.html',
})
export class TanstackComponent {
  todoService = inject(TodoService);
  queryClient = injectQueryClient();

  query = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getTodos(),
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (todo: Todo) => this.todoService.addTodo(todo),
    onSuccess: () => {
      // Invalidate and refetch by using the client directly
      client.invalidateQueries({ queryKey: ['todos'] });

      // OR use the queryClient that is injected into the component
      // this.queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  }));

  onAddTodo() {
    this.mutation.mutate({
      id: Date.now().toString(),
      title: 'Do Laundry',
    });
  }
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos(): Promise<Todo[]> {
    return lastValueFrom(
      this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    );
  }

  addTodo(todo: Todo): Promise<Todo> {
    return lastValueFrom(
      this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
    );
  }
}

interface Todo {
  id: string;
  title: string;
}
