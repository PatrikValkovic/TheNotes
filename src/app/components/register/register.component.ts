import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatchValidator} from '../../utils/validators/match.validation';
import {PasswordStrengthValidator} from '../../utils/validators/passwordStrength.validation';
import {PasswordValidatorService} from '../../services/password-validator.service';
import {AccountManagementService} from '../../services/account-management.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  static EMAIL_INPUT = 'email';
  static PASSWORD_INPUT = 'password';
  static PASSWORD_REPEAT_INPUT = 'password_repeat';

  public get EMAIL_INPUT(): string {
    return RegisterComponent.EMAIL_INPUT;
  }

  public get PASSWORD_INPUT(): string {
    return RegisterComponent.PASSWORD_INPUT;
  }

  public get PASSWORD_REPEAT_INPUT(): string {
    return RegisterComponent.PASSWORD_REPEAT_INPUT;
  }

  public MatchValidator: typeof MatchValidator = MatchValidator;
  PasswordStrengthValidator: typeof PasswordStrengthValidator = PasswordStrengthValidator;

  private loading: boolean;

  get passwordErrors(): string {
    const errors = this.passwordService.feedbackWarning(this.passwordInput.value);
    return errors ? `${errors}.` : null;
  }

  public registerForm: FormGroup;


  constructor(passwordValidator: PasswordStrengthValidator,
              private passwordService: PasswordValidatorService,
              private accountService: AccountManagementService,
              private router: Router,
              private route: ActivatedRoute) {
    this.registerForm = new FormGroup({
      [this.EMAIL_INPUT]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.PASSWORD_INPUT]: new FormControl('', [
        Validators.required,
        passwordValidator.create(1),
      ]),
      [this.PASSWORD_REPEAT_INPUT]: new FormControl('', Validators.required),
    }, [MatchValidator.create(this.PASSWORD_INPUT, this.PASSWORD_REPEAT_INPUT)]);
  }

  get emailInput(): AbstractControl {
    return this.registerForm.get(this.EMAIL_INPUT);
  }

  get passwordInput(): AbstractControl {
    return this.registerForm.get(this.PASSWORD_INPUT);
  }

  get passwordRepeatInput(): AbstractControl {
    return this.registerForm.get(this.PASSWORD_REPEAT_INPUT);
  }

  async formSent() {
    const {email, password} = this.registerForm.value;
    this.loading = true;
    try {
      await this.accountService.register(email, password);
      await this.router.navigate(['./registered'], {relativeTo: this.route});
    } catch (error) {
      console.log('error', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.emailInput.setErrors({'in-use': true});
          break;
        case 'auth/invalid-email':
          this.emailInput.setErrors({'email': true});
          break;
        case 'auth/operation-not-allowed':
          this.registerForm.setErrors({'not-allowed': true});
          break;
        case 'auth/weak-password':
          this.passwordInput.setErrors({[PasswordStrengthValidator.NAME]: true});
          break;
      }
    } finally {
      this.loading = false;
    }
  }

}
