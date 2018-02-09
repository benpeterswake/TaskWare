import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { Todo } from '../../models/todo';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,  FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';

@Component({
  selector: 'page-addtodo',
  templateUrl: 'addtodo.html',
})
export class AddtodoPage {

    event = {startTime: new Date().toISOString()}
    todoDataRef$: FirebaseListObservable<Todo[]>;
    todo = {} as Todo;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

  this.afAuth.authState.take(1).subscribe(auth => {
  this.todoDataRef$ = this.afDatabase.list(`todo/${auth.uid}`);
  })

  }


  createToDo() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`todo/${auth.uid}`).push(this.todo)
      .then(() => this.navCtrl.parent.select(1));

    })
  }


}
