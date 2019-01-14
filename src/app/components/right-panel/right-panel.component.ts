import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Note} from '../Note';
import {FilteringService} from '../../services/filtering.service';
import {SettingRepositoryService} from '../../services/setting-repository.service';
import {NoteComponent} from '../note/note.component';
import TinyQueue from 'tinyqueue';
import {ConvertService} from '../../services/convert.service';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPanelComponent implements OnInit {

  @Input() columns: number;

  notes: Note[] = [];
  loading = true;
  private loadedNotes: Set<NoteComponent> = new Set();

  constructor(private filtering: FilteringService,
              private cdr: ChangeDetectorRef,
              private settings: SettingRepositoryService,
              private convert: ConvertService) {
  }

  get containerPadding(): number {
    return this.settings.getMargin() / 2;
  }

  ngOnInit() {
    this.filtering.notesChanged.subscribe(notes => {
      this.notes = notes;
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  noteLoaded($event: NoteComponent) {
    this.loadedNotes.add($event);
    this.positionElements();
  }

  noteUnloaded($event: NoteComponent) {
    this.loadedNotes.delete($event);
    this.positionElements();
  }

  private positionElements() {
    // create priority queue
    const queue: TinyQueue = new TinyQueue([], (l: Point, r: Point) => {
      return Math.abs(Math.pow(l.x, 2) + Math.pow(l.y, 3))
        -
        Math.abs(Math.pow(r.x, 2) + Math.pow(r.y, 3));
    });
    // fill with beginning points
    for (let i = 0; i < this.columns; i++) {
      queue.push({
        x: this.settings.getMargin() + i * (this.settings.getNoteWidth() + this.settings.getMargin()),
        y: this.settings.getMargin(),
      });
    }
    // position notes
    const componentsAsArray = Array.from(this.loadedNotes);
    for (const note of this.notes) {
      const elems: NoteComponent[] = componentsAsArray.filter(x => x.note === note);
      if (elems.length === 0 || elems[0].offsetHeight === 0) {
        setTimeout(() => this.positionElements(), 0);
        return;
      }
      const elem = elems[0];
      const position = queue.pop();

      elem.leftPosition = position.x;
      elem.topPosition = position.y;

      const itsHeight: number = elem.offsetHeight;
      const heightInEm: number = this.convert.pxToEm(itsHeight);
      const newStartPoint = {
        x: position.x,
        y: position.y + heightInEm + this.settings.getMargin(),
      };
      queue.push(newStartPoint);
    }
    this.cdr.markForCheck();
  }

}
