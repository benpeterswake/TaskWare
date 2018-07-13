import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Todo } from '../../models/todo';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,  FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-addtodo',
  templateUrl: 'addtodo.html',
})
export class AddtodoPage {

    event = {startTime: new Date().toISOString()}
    todoDataRef$: FirebaseListObservable<Todo[]>;
    todo = {} as Todo;
    categories: any;
    previousCategories: any;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.previousCategories = [];
    this.afAuth.authState.take(1).subscribe(auth => {
      this.todoDataRef$ = this.afDatabase.list(`todo/${auth.uid}`);
      this.categories = firebase.database().ref(`todo/${auth.uid}/`);
      this.categories.orderByKey().on("child_added", (snapshot) => {
        if(snapshot.val().Cat && this.previousCategories.includes(snapshot.val().Cat) === false){
          this.previousCategories.push(snapshot.val().Cat)
        }
      });
    })
  }

  selectCat(cat){
    this.todo.Cat = cat;
  }

  createToDo() {
    if(this.todo.Cat){
      this.todo.Cat = this.todo.Cat.toUpperCase()
    }
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`todo/${auth.uid}`).push(this.todo)
      .then(() => this.navCtrl.parent.select(1));
    })
  }

}
