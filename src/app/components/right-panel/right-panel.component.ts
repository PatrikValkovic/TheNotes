import {Component, OnInit} from '@angular/core';
import {Note} from '../Note';
import {DatabaseManagementService} from '../../services/database-management.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  notes: Note[] = [];

  constructor(private database: DatabaseManagementService) {
  }

  ngOnInit() {
    this.database.getNotes().then(notes => this.notes = notes);
  }

}
