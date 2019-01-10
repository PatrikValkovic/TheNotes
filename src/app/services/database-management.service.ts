import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {AccountManagementService} from './account-management.service';
import {Note} from '../components/Note';
import {firestore} from 'firebase';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagementService {

  private notes: Array<Note> = null;

  constructor(private firebase: FirebaseService,
              private account: AccountManagementService) {
  }

  private async getDocRef() {
    const userUid: string = await this.account.getUserUid();
    return await this.firebase.getDatabase()
      .collection('users')
      .doc(userUid);
  }

  private async getDoc(): Promise<firestore.DocumentSnapshot> {
    const docRef = await this.getDocRef();
    return docRef.get();
  }

  async getNotes(): Promise<Note[]> {
    if (!this.notes) {
      const doc = await this.getDoc();
      this.notes = Array.from(Note.createFromDatabase(doc.data().notes));
    }
    return this.notes;
  }

  async createUsersSpace(): Promise<void> {
    const docRef = await this.getDocRef();
    await docRef.set({
      notes: environment.default_notes
    });
  }

  async setNotes(notes: Note[]) {
    const docRef = await this.getDocRef();

    await docRef.update({
      notes: notes.map(n => n.toObject())
    });

    this.notes = [...notes];
  }

  async addNote(note: Note) {
    return this.setNotes([...this.notes, note]);
  }

  async getTags(): Promise<string[]> {
    const notes = await this.getNotes();
    const tagsInArray = notes.map(value => value.tags);
    const tags = ([] as string[]).concat(...tagsInArray);
    return Array.from(new Set<string>(tags));
  }
}
