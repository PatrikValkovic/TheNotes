import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class MatchValidator {

  static get NAME(): string {
    return 'match';
  }

  static create(first: string, second: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const firstControl = control.get(first);
      const secondControl = control.get(second);
      if (firstControl && secondControl && firstControl.value === secondControl.value) {
        return null;
      }
      return {match: true};
    };
  }
}

