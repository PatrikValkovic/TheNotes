import {Component, OnInit} from '@angular/core';
import {DatabaseManagementService} from '../../services/database-management.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  constructor(private database: DatabaseManagementService) {
  }

  tags: string[] = [];

  ngOnInit() {
    this.database.getTags()
      .then(tags => this.tags = tags);
  }

}
