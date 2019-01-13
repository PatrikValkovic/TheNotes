import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Note} from '../Note';
import {FilteringService} from '../../services/filtering.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPanelComponent implements OnInit {

  notes: Note[] = [];
  loading = true;

  constructor(private filtering: FilteringService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.filtering.notesChanged.subscribe(notes => {
      this.notes = notes;
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

}
