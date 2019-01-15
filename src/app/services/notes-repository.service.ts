import {Injectable} from '@angular/core';
import {Note} from '../components/Note';
import {BehaviorSubject, Subject} from 'rxjs';
import {DatabaseManagementService} from './database-management.service';

@Injectable({
  providedIn: 'root'
})
export class NotesRepositoryService {
  private notes: Array<Note> = null;
  private notesSubject: Subject<Note[]> = new BehaviorSubject(null);

  public get notesChanged(): Subject<Note[]> {
    return this.notesSubject;
  }

  constructor(private database: DatabaseManagementService) {
    this.getNotes();
    // TODO catch
  }

  async setNotes(notes: Note[]) {
    const docRef = await this.database.getDocRef();

    await docRef.update({
      notes: notes.map(n => n.toObject())
    });

    this.notes = notes;
    this.notesChanged.next(this.notes);
  }

  async addNote(note: Note) {
    return this.setNotes([...this.notes, note]);
  }

  async getTags(): Promise<string[]> {
    const notes = await this.getNotes();
    const tagsInArray = notes.map(value => value.tags);
    const tags = ([] as string[]).concat(...tagsInArray);
    return Array.from(new Set<string>(tags));
  }

  async getNotes(): Promise<Note[]> {
    const doc = await this.database.getDoc();
    if (!this.notes) {
      const notes = Array.from(Note.createFromDatabase(doc.data().notes));
      this.notes = notes;
      this.notesChanged.next(notes);
    }
    return this.notes;
  }

  async deleteNote(index: number) {
    const cpNotes = [...this.notes];
    cpNotes.splice(index, 1);
    await this.setNotes(cpNotes);
  }

  async modifyNote(note: Note, index: number) {
    const cpNotes = [...this.notes];
    cpNotes.splice(index, 1, note);
    await this.setNotes(cpNotes);
  }
}
