import {Component, Input, ElementRef, EventEmitter, Output, HostBinding, AfterViewInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Note} from '../Note';
import {SettingRepositoryService} from '../../services/setting-repository.service';
import {FilteringService} from '../../services/filtering.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements AfterViewInit, OnDestroy {

  @HostBinding('style.left.em') leftPosition: number;
  @HostBinding('style.top.em') topPosition: number;

  @Input() note: Note;
  @Output() loaded: EventEmitter<NoteComponent> = new EventEmitter();
  @Output() unloaded: EventEmitter<NoteComponent> = new EventEmitter();

  constructor(private settings: SettingRepositoryService,
              private filter: FilteringService,
              private el: ElementRef) {
  }

  get width(): number {
    return this.settings.getNoteWidth();
  }

  get offsetHeight(): number {
    return this.el.nativeElement.offsetHeight;
  }

  tagSelected(tag: string) {
    this.filter.toggleFilterTag(tag);
  }

  ngAfterViewInit(): void {
    this.loaded.emit(this);
  }

  ngOnDestroy(): void {
    this.unloaded.emit(this);
  }
}
