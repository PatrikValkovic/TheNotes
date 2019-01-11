import {Injectable} from '@angular/core';
import {Note} from '../components/Note';
import {Subject} from 'rxjs';
import {DatabaseManagementService} from './database-management.service';

@Injectable({
  providedIn: 'root'
})
export class NotesRepositoryService {
  private notes: Array<Note> = null;
  private notesSubject: Subject<Note[]> = new Subject();

  public get notesChanged(): Subject<Note[]> {
    return this.notesSubject;
  }

  constructor(private database: DatabaseManagementService) {
    this.notesSubject.subscribe(n => this.notes = n);
    this.getNotes()
      .then(n => this.setNotes(n));
    // TODO catch
  }

  async setNotes(notes: Note[]) {
    const docRef = await this.database.getDocRef();

    await docRef.update({
      notes: notes.map(n => n.toObject())
    });

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
    if (!this.notes) {
      const doc = await this.database.getDoc();
      this.notes = Array.from(Note.createFromDatabase(doc.data().notes));
    }
    return this.notes;
  }
}
