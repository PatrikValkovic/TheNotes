import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatchValidator} from '../../utils/validators/match.validation';
import {PasswordStrengthValidator} from '../../utils/validators/passwordStrength.validation';
import {PasswordValidatorService} from '../../services/password-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public MatchValidator: typeof MatchValidator = MatchValidator;
  PasswordStrengthValidator: typeof PasswordStrengthValidator = PasswordStrengthValidator;

  get passwordErrors(): string {
    const errors = this.passwordService.feedbackWarning(this.passwordInput.value);
    return errors ? `${errors}.` : null;
  }

  public registerForm: FormGroup;


  constructor(passwordValidator: PasswordStrengthValidator,
              private passwordService: PasswordValidatorService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        passwordValidator.create(1),
      ]),
      password_repeat: new FormControl('', Validators.required),
    }, [MatchValidator.create('password', 'password_repeat')]);
  }

  ngOnInit() {
  }

  get usernameInput(): AbstractControl {
    return this.registerForm.get('username');
  }

  get passwordInput(): AbstractControl {
    return this.registerForm.get('password');
  }

  get passwordRepeatInput(): AbstractControl {
    return this.registerForm.get('password_repeat');
  }

  formSent() {
    console.log('Sent', this.registerForm.value);
  }

}
