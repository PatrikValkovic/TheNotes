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

  constructor(private notes: NotesRepositoryService) {
  }

  get positionActionText(): string {
    return this.creating ? 'Create' : 'Modify';
  }

  get negativeActionText(): string {
    return this.creating ? 'Cancel' : 'Delete';
  }

  public createNote() {
    this.creating = true;
    this.note.next(new Note('', '', []));
  }

  public modifyNote(note: Note) {
    this.creating = false;
    this.note.next(note);
  }

  public async propagateSuccessAction(note: Note) {
    await this.notes.addNote(note);
    this.note.next(null);
  }

  public propagateNegativeAction() {
    if (this.creating) {
      this.note.next(null);
    } else {
      this.notes.deleteNote();
    }
  }
}
