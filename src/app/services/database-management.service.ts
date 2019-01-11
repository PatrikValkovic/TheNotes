import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {AccountManagementService} from './account-management.service';
import {firestore} from 'firebase';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagementService {

  constructor(private firebase: FirebaseService,
              private account: AccountManagementService) {
  }

  public async getDocRef() {
    let userUid: string = null;
    for (let i = 0; i < 10 && !userUid; i++) {
      userUid = await this.account.getUserUid();
    }
    if (!userUid) {
      throw new Error(`Can't load user's ID`);
    }
    return await this.firebase.getDatabase()
      .collection('users')
      .doc(userUid);
  }

  public async getDoc(): Promise<firestore.DocumentSnapshot> {
    const docRef = await this.getDocRef();
    return docRef.get();
  }

  async createUsersSpace(): Promise<void> {
    const docRef = await this.getDocRef();
    await docRef.set({
      notes: environment.default_notes
    });
  }
}
