import { Injectable } from '@angular/core';
import {NotesRepositoryService} from './notes-repository.service';
import {Note} from '../components/Note';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

  private filteredNotes: Note[];
  private allNotes: Note[] = [];

  private baseTextFilterOn = '';

  private notesSubject: Subject<Note[]> = new Subject();
  public get notesChanged(): Subject<Note[]> {
    return this.notesSubject;
  }

  constructor(private notes: NotesRepositoryService) {
    this.notes.notesChanged.subscribe(n => {
      this.allNotes = n;
      this.filterNotes();
    });
  }

  private filterNotes() {
    let filtered: Note[] = Array.from(this.allNotes);
    if (this.baseTextFilterOn && this.baseTextFilterOn.length > 0){
      const f = this.baseTextFilterOn;
      filtered = filtered.filter(n => n.heading.toLowerCase().includes(f) || n.content.toLowerCase().includes(f));
    }
    this.filteredNotes = Array.from(filtered);
    this.notesChanged.next(this.filteredNotes);
  }

  filterTextChange(content: string) {
    this.baseTextFilterOn = content.toLowerCase();
    this.filterNotes();
  }
}
