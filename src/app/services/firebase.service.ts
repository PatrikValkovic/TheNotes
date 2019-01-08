import {Injectable} from '@angular/core';
import {app, auth, initializeApp} from 'firebase';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firebase_app: app.App;

  constructor() {
    this.firebase_app = initializeApp(environment.firebase_keys);
  }

  getAuth(): auth.Auth {
    return this.firebase_app.auth();
  }
}
