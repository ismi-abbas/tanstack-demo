import { Component } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { NoteService } from '../services/database.service';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewNote } from '../../db/schema';

@Component({
  selector: 'app-tanstack',
  standalone: true,
  imports: [
    HlmCaptionComponent,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
    HlmLabelDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './tanstack.component.html',
})
export class TanstackComponent {
  constructor(private noteService: NoteService, private form: FormBuilder) {}
  queryClient = injectQueryClient();

  noteForm = new FormGroup({
    note: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
  });

  query = injectQuery(() => ({
    queryKey: ['notes'],
    queryFn: async () => this.noteService.getNotes(),
    staleTime: 1000 * 60 * 5,
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (todo: NewNote) => this.noteService.addNewNote(todo),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  onAddTodo() {
    this.mutation.mutateAsync({
      note: this.noteForm.get('note')?.value || '',
      createdAt: this.noteForm.get('date')?.value || new Date(),
    });
  }
}
