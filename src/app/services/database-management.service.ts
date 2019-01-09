import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {AccountManagementService} from './account-management.service';
import {Note} from '../components/Note';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagementService {

  constructor(private firebase: FirebaseService,
              private account: AccountManagementService) {
  }

  async getNotes(): Promise<Note[]> {
    const userUid: string = await this.account.getUserUid();
    const doc = await this.firebase.getDatabase()
      .collection('users')
      .doc(userUid)
      .get();
    return Array.from(Note.createFromDatabase(doc.data().notes));
  }

  async checkUsersDocument() {
    const userUid: string = await this.account.getUserUid();
    const doc = this.firebase.getDatabase()
      .collection('users')
      .doc(userUid);
    const snapshot = await doc.get();
    if (!snapshot.exists) {
      await doc.set(
        {
          notes:
            [
              {
                heading: 'My first note',
                content: 'Notes that are generated',
                tags: ['TheNote', 'Startup'],
              },
              {
                heading: 'Second note in the app',
                content: 'Try all the features that the app provide for you',
                tags: [],
              },
            ]
        });
    } // end of if
  }
}
