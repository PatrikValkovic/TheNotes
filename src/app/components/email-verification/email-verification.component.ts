import {Component, OnInit} from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {ActivatedRoute} from '@angular/router';
import {DatabaseManagementService} from '../../services/database-management.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  private actionCode: string;
  public verification_in_progress = false;
  public error = '';

  constructor(private account: AccountManagementService,
              private route: ActivatedRoute,
              private database: DatabaseManagementService) {
    this.route.queryParams.subscribe(params => this.actionCode = params['oobCode']);
  }

  async ngOnInit() {
    try {
      this.verification_in_progress = true;
      await this.account.verifyEmail(this.actionCode);
      await this.database.createUsersSpace();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.verification_in_progress = false;
    }
  }

}
