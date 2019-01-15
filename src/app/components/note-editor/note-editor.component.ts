import {Component, HostBinding, OnInit} from '@angular/core';
import {Note} from '../Note';
import {FormControl} from '@angular/forms';
import {NoteEditorBackendService} from '../../services/note-editor-backend.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  note: Note = null;
  headingInput: FormControl = new FormControl();
  contentInput: FormControl = new FormControl();

  showPlus = true;

  constructor(private backend: NoteEditorBackendService) {
  }

  get displayEditor(): boolean {
    return !!this.note;
  }

  @HostBinding('style.display')
  get hostDisplayStyle(): string {
    return this.displayEditor ? 'block' : 'none';
  }

  get positiveText(): string {
    return this.backend.positionActionText;
  }

  get negativeText(): string {
    return this.backend.negativeActionText;
  }

  ngOnInit() {
    this.backend.note.subscribe(n => {
      this.note = n;

      if (this.displayEditor) {
        this.headingInput = new FormControl(this.note.heading);
        this.contentInput = new FormControl(this.note.content);
      }
    });
  }

  removeTag(tag: string) {
    const pos = this.note.tags.indexOf(tag);
    if (pos < 0) {
      return;
    }
    this.note.tags.splice(pos, 1);
  }

  showTagDialog($event: MouseEvent) {
    this.showPlus = false;
    $event.stopPropagation();
  }

  tagDialogClose() {
    this.showPlus = true;
  }

  tagDialogSelected($event: string) {
    const tagSet = new Set([...this.note.tags, $event]);
    this.note.tags = Array.from(tagSet);
    this.tagDialogClose();
  }

  clickedOnTheNoteEditor() {
    this.tagDialogClose();
  }

  async successAction() {
    this.note.heading = this.headingInput.value;
    this.note.content = this.contentInput.value;
    await this.backend.propagateSuccessAction(this.note);
  }

  negativeAction() {

  }
}
