import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private afAuth: AngularFireAuth, platform: Platform,
    statusBar: StatusBar, splashScreen: SplashScreen, private toast: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.afAuth.authState.take(1).subscribe(auth => {
        if (auth) {
          this.rootPage = TabsPage;
          this.toast.create({
            message: `Success!`,
            duration: 1000,
            cssClass: "toast-success"
          }).present();
        } else{
          this.rootPage = LoginPage;
        }
        });

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
        this.rootPage = TabsPage;
        this.toast.create({
          message: `Success!`,
          duration: 1000,
          cssClass: "toast-success"
        }).present();
      } else {
        this.rootPage = LoginPage;
      }
    })
    });
  }
}
