import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor() {

  }
}
