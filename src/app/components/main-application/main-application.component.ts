import {Component, OnInit} from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss']
})
export class MainApplicationComponent implements OnInit {

  constructor(private account: AccountManagementService,
              private router: Router) {
  }

  async ngOnInit() {
    if (!await this.account.isUserLogIn()) {
      return this.router.navigate(['/login']);
    }
  }

}
