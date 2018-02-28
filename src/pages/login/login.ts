import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { SliderPage } from '../slider/slider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  test: any;

  constructor(public storage: Storage, private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(SliderPage);
      }
    });
  }

  async login(user: User){
  try{
      this.test = true;
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
      await this.navCtrl.setRoot(TabsPage);
      }
    } catch(e){
      this.test = false;
      this.toast.create({
        message: "Invalid email or password!",
        duration: 3000,
        cssClass: "error"
      }).present();
    }
  }

  async register(){
  await this.navCtrl.push(RegisterPage);
  }

}
