import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';

export interface User {
  email: string;
  pass: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  signUp(user: User) {
    return createUserWithEmailAndPassword(this._auth, user.email, user.pass);
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.pass);
  }

  signInGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }
}
