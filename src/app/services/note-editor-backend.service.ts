import {Injectable} from '@angular/core';
import {Note} from '../components/Note';
import {BehaviorSubject, Subject} from 'rxjs';
import {NotesRepositoryService} from './notes-repository.service';

@Injectable({
  providedIn: 'root'
})
export class NoteEditorBackendService {

  note: Subject<Note> = new BehaviorSubject(null);
  private creating: boolean;
  private index: number;

  constructor(private notes: NotesRepositoryService) {
  }

  get positionActionText(): string {
    return this.creating ? 'Create' : 'Modify';
  }

  get negativeActionText(): string {
    return this.creating ? 'Cancel' : 'Delete';
  }

  public closeEditor() {
    this.note.next(null);
  }

  public createNote() {
    this.creating = true;
    this.note.next(new Note('', '', []));
  }

  public modifyNote(note: Note, index: number) {
    this.creating = false;
    this.index = index;
    this.note.next(note);
  }

  public async propagateSuccessAction(note: Note) {
    if (this.creating) {
      await this.notes.addNote(note);
    } else {
      await this.notes.modifyNote(note, this.index);
    }
    this.note.next(null);
  }

  public async propagateNegativeAction() {
    if (!this.creating) {
      await this.notes.deleteNote(this.index);
    }
    this.note.next(null);
  }
}
