
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Content, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Todo } from './../../models/todo';
import { EditpagePage } from '../editpage/editpage';
import { AddtodoPage } from '../addtodo/addtodo';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})

export class AboutPage{
  @ViewChild(Content) content: Content;
  todoDataRef$: FirebaseListObservable<Todo[]>;
  todo = {} as Todo;
  completed = 0;
  selectedDay = new Date();
  month = this.selectedDay.getMonth()+1;
  year = this.selectedDay.getFullYear();
  monthFormat: any;
  sort: any;
  catergorized: any;
  appliedCatergories: any;
  completedList = [];

  constructor(private actionSheetCtrl: ActionSheetController ,public navCtrl: NavController, public navParams: NavParams,
  private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
          this.appliedCatergories = []
          this.afAuth.authState.take(1).subscribe(auth => {
            this.todoDataRef$ = this.afDatabase.list(`todo/${auth.uid}`);
            this.sort = firebase.database().ref(`todo/${auth.uid}/`);
          });
          this.monthFormat = (`0${this.month}`)
    }

    selectTodoItem(todo: Todo){
      this.afAuth.authState.take(1).subscribe(auth => {
        if(todo.Completed === true){
          firebase.database().ref(`todo/${auth.uid}/${todo.$key}`).update({
            Completed: false
          })
        }else{
          firebase.database().ref(`todo/${auth.uid}/${todo.$key}`).update({
            Completed: true
          })
        }
      });
      // this.actionSheetCtrl.create({
      //   title: `${todo.Title}`,
      //   buttons: [
      //   {
      //     text: 'Mark As Completed',
      //     role: 'destructive',
      //     cssClass: "completed",
      //     handler: () =>{
      //      this.todoDataRef$.remove(todo.$key);
      //       if (this.todoDataRef$.remove(todo.$key)){
      //         this.afAuth.authState.take(1).subscribe(auth => {
      //             this.afDatabase.object(`completed/${auth.uid}/${this.year}/${this.monthFormat}`).$ref
      //             .ref.transaction(completed => {
      //                 if (completed === null) {
      //                     return completed = 1;
      //                 } else {
      //                     return completed + 1;
      //                 }
      //             });
      //         });
      //       }
      //     }
      //   },
      //       {
      //         text: 'Edit',
      //         cssClass: "edit",
      //         handler: () =>{
      //          this.navCtrl.push(EditpagePage, {todoId: todo.$key});
      //         }
      //     },
      //
      //       {
      //         text: 'Cancel',
      //         role: 'cancel',
      //         handler: () =>{
      //          console.log("Canceled");
      //           }
      //       }
      //   ]
      // }).present();
    }

    sortByCategory(cat){
      if(this.appliedCatergories.includes(cat)){
        console.log('Already have that filter')
      }else{
        this.appliedCatergories.push(cat)
        this.catergorized = [];
        this.sort.orderByKey().on("child_added", (snapshot) => {
          if(snapshot.val().Cat === cat){
            this.catergorized.push(snapshot.val())
          }
          this.content.scrollToTop(400);
        });
        return this.catergorized;
      }
    }

    addToCompleted(item){
      console.log(item.$key)
    }

    removeCategory(){
      this.appliedCatergories = [];
      this.catergorized = undefined;
    }

    addtodo(){
    this.navCtrl.push(AddtodoPage);
    }


 }
