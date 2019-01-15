import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {auth, User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  constructor(private firebase: FirebaseService) {
    firebase.getAuth().setPersistence(auth.Auth.Persistence.LOCAL).catch(err => {
      // TODO better handling
      console.log('Can\'t set persistence', err);
    });
  }

  async register(email: string, password: string): Promise<auth.UserCredential> {
    const user = await this.firebase.getAuth().createUserWithEmailAndPassword(email, password);
    await user.user.sendEmailVerification();
    return user;
  }

  async verifyEmail(actionCode: string): Promise<void> {
    await this.firebase.getAuth().applyActionCode(actionCode);
    if (this.firebase.getAuth().currentUser) {
      await this.firebase.getAuth().currentUser.reload();
    }
  }

  async login(email: string, password: string): Promise<auth.UserCredential> {
    return await this.firebase.getAuth().signInWithEmailAndPassword(email, password);
  }

  async isUserLogIn(): Promise<boolean> {
    const user = await this.getUser();
    return user && user.emailVerified;
  }

  async getUser(): Promise<User | null> {
    if (!this.firebase.getAuth().currentUser) {
      const waitPromise = new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const userPromise = new Promise((resolve) => {
        this.firebase.getAuth().onAuthStateChanged(resolve);
      });
      await Promise.race([waitPromise, userPromise]);
    }
    return this.firebase.getAuth().currentUser;
  }

  async getUserUid(): Promise<string> {
    const user = await this.getUser();
    return user ? user.uid : null;
  }

  logout(): Promise<void> {
    return this.firebase.getAuth().signOut();
  }
}
