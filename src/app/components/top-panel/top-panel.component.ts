import {Component, OnInit} from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnInit {

  constructor(private router: Router,
              private account: AccountManagementService) {
  }

  ngOnInit() {
  }

  async logout() {
    await this.account.logout();
    this.router.navigate(['/login']);
  }
}
