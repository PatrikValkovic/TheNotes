import {Injectable} from '@angular/core';
// noinspection SpellCheckingInspection
import * as zxcvbn from 'zxcvbn';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  checkPassword = (password: string): 0 | 1 | 2 | 3 | 4 | 5 => password.length < 6 ? 0 : zxcvbn(password).score;

  feedbackWarning = (password: string): string => zxcvbn(password).feedback.warning;
}
