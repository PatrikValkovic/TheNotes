import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Note} from '../Note';
import {NotesRepositoryService} from '../../services/notes-repository.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPanelComponent implements OnInit {

  notes: Note[] = [];

  constructor(private notesRepo: NotesRepositoryService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.notesRepo.notesChanged.subscribe(notes => {
      this.notes = notes;
      this.cdr.markForCheck();
    });
  }

}
