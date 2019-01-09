import {Injectable} from '@angular/core';
import {app, auth, firestore, initializeApp} from 'firebase';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firebase_app: app.App;
  private firestore: firestore.Firestore = null;

  constructor() {
    this.firebase_app = initializeApp(environment.firebase_keys);
  }

  getAuth(): auth.Auth {
    return this.firebase_app.auth();
  }

  getDatabase(): firestore.Firestore {
    if (!this.firestore) {
      this.firestore = this.firebase_app.firestore();
      this.firestore.settings({timestampsInSnapshots: true});
    }

    return this.firestore;
  }
}
