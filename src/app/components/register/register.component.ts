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
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        passwordValidator.create(1),
      ]),
      password_repeat: new FormControl('', Validators.required),
    }, [MatchValidator.create('password', 'password_repeat')]);
  }

  get emailInput(): AbstractControl {
    return this.registerForm.get('email');
  }

  get passwordInput(): AbstractControl {
    return this.registerForm.get('password');
  }

  get passwordRepeatInput(): AbstractControl {
    return this.registerForm.get('password_repeat');
  }

  async formSent() {
    console.log('Going to sent registration', this.registerForm.value);
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
