import { Injectable } from '@angular/core';
import { db } from '../../db/client';
import { NewNote, Note, notes } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  async getNotes() {
    try {
      const allNotes = await db.select().from(notes).orderBy(notes.id);
      return allNotes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addNewNote(note: NewNote) {
    try {
      const newNote = await db.insert(notes).values({
        note: note.note,
        createdAt: new Date(),
        id: v4(),
      });
      return newNote;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async removeNoteById(id: string) {
    try {
      const removedNote = await db.delete(notes).where(eq(notes.id, id));
      return removedNote;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
