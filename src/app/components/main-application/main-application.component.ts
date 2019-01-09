import {Component, OnInit} from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {Router} from '@angular/router';
import {DatabaseManagementService} from '../../services/database-management.service';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.css']
})
export class MainApplicationComponent implements OnInit {

  constructor(private account: AccountManagementService,
              private router: Router,
              private database: DatabaseManagementService) {
  }

  async ngOnInit() {
    if (!await this.account.isUserLogIn()) {
      return this.router.navigate(['/login']);
    }

    await this.database.checkUsersDocument();

    console.log('notes', await this.database.getNotes());
  }

}
