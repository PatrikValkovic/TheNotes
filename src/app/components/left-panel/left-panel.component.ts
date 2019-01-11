import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotesRepositoryService} from '../../services/notes-repository.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPanelComponent implements OnInit {

  constructor(private notesRepo: NotesRepositoryService,
              private cdr: ChangeDetectorRef) {
  }

  tags: string[] = [];

  ngOnInit() {
    this.notesRepo.notesChanged.subscribe(async () => {
      this.tags = await this.notesRepo.getTags();
      this.cdr.markForCheck();
    });
  }

}
