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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  return() {
    location.reload(true);
  }

}
