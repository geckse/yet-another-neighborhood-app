import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth
    ){
      this.reviveFromCache().then(()=>{}).catch((e)=>{});
  }

  /*
    use Annonymous login
  */
  public signInAnonymously(plz: number) {
    return new Promise<any>((resolve, reject) => {
        this.afAuth.auth.signInAnonymously().then((data) => {
          this.setUserData(data.user,null,plz);
          resolve(this.currentUser);
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          reject(`login failed ${error.message}`)
        });
    });
  }


    /*
      login with Email
    */
    public signupWithEmail(email: string, password: string, displayName: string, plz: number) {

      return new Promise<any>((resolve, reject) => {
        this.afAuth.auth.createUserWithEmailAndPassword(email,password)
            .then( (usercred) => {
              this.setUserData(usercred.user,displayName, plz);
              resolve(this.currentUser);
              console.log("Account create success", usercred.user);
        }, (error) => {
              console.log("Account create error", error);
              reject(error);
        });
      });
  }

  /*
    login with Email
  */
  public enrichWithEmail(email: string, password: string, displayName: string, plz: number) {
    var credential = auth.EmailAuthProvider.credential(email, password);
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credential)
          .then( (usercred) => {
            this.setUserData(usercred.user,displayName, plz);
            resolve(this.currentUser);
            console.log("Account linking success", usercred.user);
      }, (error) => {
            console.log("Account linking error", error);
            reject(error);
      });
    });
  }

  // Sign in with email/password
  public signIn(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${result.user.uid}`);
        userRef.ref.get().then((doc)=>{
          // @ts-ignore
          this.currentUser = doc.data();
          resolve(this.currentUser);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /*
   Send email verfificaiton when new user sign up
  */
  public sendVerificationMail() {
   return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        resolve(true);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /*
    Reset Forggot password
  */
  public forgotPassword(passwordResetEmail: string) {
    return new Promise<any>((resolve, reject) => {
     this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        resolve(true);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /* Setting up user data when sign in with username/password,
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  private setUserData(user, displayName = "", plz = null) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    // todo: ENSURE everywhere plz is number
    // @ts-ignore
    plz = parseInt(plz);

    let userData: User = {
      uid: user.uid,
      lastLogin: new Date(),
      email: user.email,
      plz: (plz ? plz : user.plz),
      displayName: (displayName ? displayName : user.displayName),
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    this.currentUser = user;
    return userRef.set(userData, {
      merge: true
    });
  }

  // Returns true when user is looged in
  public isLoggedIn(): boolean {
    return (this.currentUser) ? true : false;
  }

  public isAnon(): boolean {
    return (!this.currentUser.email) ? true : false;
  }

  public getUid(){
    return new Promise((resolve, reject) => {
      if(!this.currentUser){
        this.reviveFromCache().then(()=>{
          return resolve(this.currentUser.uid);
        }).catch((e)=>{});
      } else {
          return resolve(this.currentUser.uid);
      }
    });
  }

  public reviveFromCache(){
    return new Promise((resolve, reject) => {
      /* Saving user data in localstorage when
        logged in and setting up null when logged out */
      this.afAuth.authState.subscribe(user => {
        if (user) {
            const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
            userRef.ref.get().then((doc)=>{
              // @ts-ignore
              this.currentUser = doc.data();
              resolve(this.currentUser);
            });
            // todo native storage fallback?
        } else {
          reject('session failed');
        }
      });
    });
  }
  /*
    check if session is loaded
  */
  public isReady(){
    return new Promise((resolve, reject) => {
      this.getUid().then( () => {
        setTimeout(() => {
          return resolve(true);
        }, 100);
      });
    });
  }


  public logout(){
     return new Promise((resolve, reject) => {
       // @ts-ignore
       if(firebase.auth().currentUser){
         this.afAuth.auth.signOut()
         resolve();
       }
       else{
         reject();
       }
     });
  }

}
