import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SliderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";


  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  skip(){
  this.navCtrl.setRoot(LoginPage);
  }

  slideChanged(){
    if(this.slides.isEnd())
    this.skipMsg = "Continue";
  }

}
