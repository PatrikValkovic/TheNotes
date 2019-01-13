import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {Router} from '@angular/router';
import {FilteringService} from '../../services/filtering.service';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter();

  constructor(private router: Router,
              private account: AccountManagementService,
              private filter: FilteringService) {
  }

  ngOnInit() {
  }

  async logout() {
    await this.account.logout();
    await this.router.navigate(['/login']);
  }

  searchingChange(ev) {
    const content: string = ev.srcElement.value;
    this.filter.filterTextChange(content);
  }

  menuButtonClick() {
    this.toggleMenu.emit();
  }
}
