import {Component, OnInit} from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  private actionCode: string;
  public verificating = false;
  public error = '';

  constructor(private account: AccountManagementService,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => this.actionCode = params['oobCode']);
  }

  async ngOnInit() {
    try {
      this.verificating = true;
      await this.account.verifyEmail(this.actionCode);
    } catch (error) {
      this.error = error.message;
    } finally {
      this.verificating = false;
    }
  }

}
