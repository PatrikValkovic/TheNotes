import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../Note';
import {SettingRepositoryService} from '../../services/setting-repository.service';
import {FilteringService} from '../../services/filtering.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;

  constructor(private settings: SettingRepositoryService,
              private filter: FilteringService) {
  }

  get width(): number {
    return this.settings.getNoteWidth();
  }

  get margin(): number {
    return this.settings.getMargin() / 2;
  }

  ngOnInit() {
  }

  tagSelected(tag: string) {
    this.filter.toggleFilterTag(tag);
  }
}
