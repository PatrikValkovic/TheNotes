import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';
import {PasswordValidatorService} from '../../services/password-validator.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthValidator {

  constructor(private passwordValidator: PasswordValidatorService) {
  }

  static get NAME(): string {
    return 'passwordStrength';
  }

  create(minLevel: number): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (control &&
        control.value &&
        this.passwordValidator.checkPassword(control.value) >= minLevel) {
        return null;
      }

      return {passwordStrength: true};
    };
  }
}

