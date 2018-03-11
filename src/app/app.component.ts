import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  connected:any;
  constructor(private afAuth: AngularFireAuth, platform: Platform,
    statusBar: StatusBar, splashScreen: SplashScreen, private toast: ToastController,
    private network: Network) {
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
      });
    });
    // // watch network for a disconnect
    // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   this.connected = false;
    //   console.log('network was disconnected :-(');
    // });
    //
    // // stop disconnect watch
    // disconnectSubscription.unsubscribe();
    //
    //
    // // watch network for a connection
    // let connectSubscription = this.network.onConnect().subscribe(() => {
    //   this.connected = true;
    //   console.log('network connected!');
    //   // We just got a connection but we need to wait briefly
    //    // before we determine the connection type. Might need to wait.
    //   // prior to doing any api requests as well.
    //   setTimeout(() => {
    //     if (this.network.type === 'wifi') {
    //       console.log('we got a wifi connection, woohoo!');
    //     }
    //   }, 3000);
    // });
    //
    // // stop connect watch
    // connectSubscription.unsubscribe();
  }
}
