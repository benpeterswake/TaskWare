import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Todo } from './../../models/todo';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-editpage',
  templateUrl: 'editpage.html',
})
export class EditpagePage {

  todoDataRef$: FirebaseObjectObservable<Todo>;
  todo = {} as Todo;
  public userId;
  previousCategories: any;
  categories: any;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.previousCategories = [];
    const todoId = this.navParams.get('todoId');
    afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
      this.todoDataRef$ = this.database.object(`todo/${user.uid}/${todoId}`);
      this.categories = firebase.database().ref(`todo/${user.uid}/`);
      this.categories.orderByKey().on("child_added", (snapshot) => {
        if(snapshot.val().Cat && this.previousCategories.includes(snapshot.val().Cat) === false){
          this.previousCategories.push(snapshot.val().Cat)
        }
      });
    });
  }

  selectCat(cat){
    this.todo.Cat = cat
  }

  editTodoItem(todo: Todo){
    if(todo.Cat){
      todo.Cat = todo.Cat.toUpperCase()
    }
    this.todoDataRef$.update(todo);
    this.navCtrl.pop();
  }

}
