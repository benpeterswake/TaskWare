import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as Profile;
  public Fbref:any;
  test: any;

  constructor(private afAuth: AngularFireAuth , private afDatabase: AngularFireDatabase,
  public navCtrl: NavController,private toast: ToastController, public navParams: NavParams) {
      this.Fbref = firebase.storage().ref();
  }

  async register(user: User){
    this.profile.admin = false;
  try {
      this.test = true;
      if((this.profile.firstName === undefined || this.profile.firstName.replace(/\s+/g,'') === "" )
      || (this.profile.lastName === undefined || this.profile.lastName.replace(/\s+/g,'') === "")){
        this.toast.create({
          message: 'All fields are required',
          duration: 2500,
          cssClass: "error"
        }).present();
        this.test = false;
     }else{
       const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
       if(result){
       this.afAuth.authState.take(1).subscribe(auth => {
         this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
         .then(() => this.navCtrl.setRoot(TabsPage));
       });
        this.navCtrl.push(LoginPage);
      }
     }
   }
   catch(e){
     this.test = false;
     let errorCode = e.code;
      if (errorCode === 'auth/email-already-in-use') {
        this.toast.create({
          message: e.message,
          duration: 2500,
          cssClass: "error"
        }).present();
      } else if (errorCode === 'auth/invalid-email') {
        this.toast.create({
          message: e.message,
          duration: 2500,
          cssClass: "error"
        }).present();
      } else if (errorCode === 'auth/weak-password'){
        this.toast.create({
          message: e.message,
          duration: 2500,
          cssClass: "error"
        }).present();
      } else if (errorCode === 'auth/argument-error'){
          this.toast.create({
            message: "All fields are required",
            duration: 2500,
            cssClass: "error"
          }).present();
      } else {
        this.toast.create({
          message: "Error connecting to servers",
          duration: 2500,
          cssClass: "error"
        }).present();
      }
      console.log(e);
    }
  }

  loginPage(){
  this.navCtrl.push(LoginPage);
  }



}
