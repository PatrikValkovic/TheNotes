import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountManagementService} from '../../services/account-management.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  static EMAIL_INPUT = 'email';
  static PASSWORD_INPUT = 'password';

  get EMAIL_INPUT(): string {
    return LoginComponent.EMAIL_INPUT;
  }

  get PASSWORD_INPUT(): string {
    return LoginComponent.PASSWORD_INPUT;
  }

  public loginForm: FormGroup;
  public loading = false;
  public errors: Array<string> = [];

  constructor(private account: AccountManagementService,
              private router: Router) {
    this.loginForm = new FormGroup({
      [LoginComponent.EMAIL_INPUT]: new FormControl('', [Validators.required]),
      [LoginComponent.PASSWORD_INPUT]: new FormControl('', [Validators.required]),
    });
  }

  get emailInput(): AbstractControl {
    return this.loginForm.get(LoginComponent.EMAIL_INPUT);
  }

  get passwordInput(): AbstractControl {
    return this.loginForm.get(LoginComponent.PASSWORD_INPUT);
  }

  async sendForm() {
    try {
      this.loading = true;
      this.errors = [];

      const user = await this.account.login(this.emailInput.value, this.passwordInput.value);
      if (user.user.emailVerified) {
        return await this.router.navigate(['/app']);
      }
      this.errors.push('Email is not verified, please check your email first.');

    } catch (error) {
      this.errors.push(error.message);
      if (error.code === 'auth/wrong-password') {
        // TODO show Forget password
      }
    } finally {
      this.loading = false;
    }
  }

  ngOnInit() {
    this.account.isUserLogIn()
      .then(val => {
        if (val) {
          this.router.navigate(['/app']);
        }
      });
  }
}
