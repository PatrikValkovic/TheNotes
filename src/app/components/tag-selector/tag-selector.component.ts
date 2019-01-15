import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter, Input
} from '@angular/core';
import {NotesRepositoryService} from '../../services/notes-repository.service';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent implements OnInit, AfterViewInit {

  @Output() closeAction = new EventEmitter();
  @Output() tagSelected = new EventEmitter();
  @Input() excludedTags: string[] = [];

  @ViewChild('tagAddingInput')
  tagAddingInput: ElementRef;
  selectedIndex = -1;
  private allTags: string[] = [];
  private filteringText = '';

  constructor(private notes: NotesRepositoryService,
              private cdr: ChangeDetectorRef) {
  }

  get valueOfTheInput(): string {
    return this.selectedIndex === -1 ? this.filteringText : this.availableTags[this.selectedIndex];
  }

  get availableTags(): string[] {
    const filtered = new Set(this.allTags.filter((t => t.toLowerCase().includes(this.filteringText.toLowerCase()))));
    for (const e of this.excludedTags) {
      filtered.delete(e);
    }
    return Array.from(filtered);
  }

  ngOnInit() {
    this.notes.notesChanged.subscribe(async n => {
      this.allTags = await this.notes.getTags();
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.tagAddingInput.nativeElement.focus();
  }

  clickedOnTagDiv($event: MouseEvent) {
    $event.stopPropagation();
  }

  typedToSearchTag($event: KeyboardEvent) {
    const srcElement = <HTMLInputElement>$event.srcElement;
    // if user selected on the existing tags and press esc
    if ($event.key === 'Escape' && srcElement.value !== this.filteringText) {
      srcElement.value = this.filteringText;
      this.selectedIndex = -1;
      return;
    }
    // if user press esc and no tag is selected then close dialog
    if ($event.key === 'Escape') {
      this.closeAction.emit();
    }
    // if user press enter and ctrl then append enter
    if ($event.key === 'Enter' && $event.ctrlKey) {
      this.filteringText += '\n';
      this.selectedIndex = -1;
      return;
    }
    // if user just press enter use current value as new tag
    if ($event.key === 'Enter') {
      this.tagSelected.emit(this.valueOfTheInput);
      return;
    }
    // if user press some arrow then move selection
    if ($event.key === 'ArrowDown' || $event.key === 'ArrowRight' || $event.key === 'ArrowUp' || $event.key === 'ArrowLeft') {
      const tagsLength = this.availableTags.length;
      this.selectedIndex = (this.selectedIndex + tagsLength + (
        $event.key === 'ArrowDown' || $event.key === 'ArrowRight' ? 1 : -1
      )) % this.availableTags.length;
      srcElement.value = this.availableTags[this.selectedIndex];
      return;
    }
    // otherwise just append the text
    this.filteringText = srcElement.value;
    this.selectedIndex = -1;
  }

  hoverMouse(i: number) {
    this.selectedIndex = i;
  }

  tagClicked(i: number) {
    this.tagSelected.emit(this.availableTags[i]);
  }
}
