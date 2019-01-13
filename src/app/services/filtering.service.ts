import {Injectable} from '@angular/core';
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
  public notesChanged: Subject<Note[]> = new Subject();
  public tagsSelectionChanged: Subject<void> = new Subject();
  private baseTagFilterOn: Set<string> = new Set();

  constructor(private notes: NotesRepositoryService) {
    this.notes.notesChanged.subscribe(n => {
      this.allNotes = n;
      this.filterNotes();
    });
  }

  toggleFilterTag(tag: string) {
    if (this.baseTagFilterOn.has(tag)) {
      this.baseTagFilterOn.delete(tag);
    } else {
      this.baseTagFilterOn.add(tag);
    }
    this.tagsSelectionChanged.next();
    this.filterNotes();
  }

  filterTextChange(content: string) {
    this.baseTextFilterOn = content.toLowerCase();
    this.filterNotes();
  }

  isTagSelected(tag: string): boolean {
    return this.baseTagFilterOn.has(tag);
  }

  private filterNotes() {
    let filtered: Note[] = Array.from(this.allNotes);
    if (this.baseTextFilterOn && this.baseTextFilterOn.length > 0) {
      const f = this.baseTextFilterOn;
      filtered = filtered.filter(n => n.heading.toLowerCase().includes(f) || n.content.toLowerCase().includes(f));
    }
    if (this.baseTagFilterOn.size > 0) {
      filtered = filtered.filter(el => el.tags.filter(t => this.baseTagFilterOn.has(t)).length === this.baseTagFilterOn.size);
    }
    this.filteredNotes = Array.from(filtered);
    this.notesChanged.next(this.filteredNotes);
  }
}
