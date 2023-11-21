import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  // Sign-up method
  async signUp(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Login method
  async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out method
  async signOut() {
    await this.afAuth.signOut();
  }
}
