import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  constructor(private firebase: FirebaseService) {
  }

  async register(email: string, password: string): Promise<auth.UserCredential> {
    const user = await this.firebase.getAuth().createUserWithEmailAndPassword(email, password);
    await user.user.sendEmailVerification();
    return user;
  }
}
