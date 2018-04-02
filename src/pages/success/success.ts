import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the SuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {
  tabBarElement: any;
  test: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.test = false;
  }

  return() {
    this.test = true;
    setTimeout(() => {
      location.reload(false);
    }, 5500)
  }

}
