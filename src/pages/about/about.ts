
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Todo } from './../../models/todo';
import { EditpagePage } from '../editpage/editpage';
import { AddtodoPage } from '../addtodo/addtodo';
import firebase from 'firebase';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})

export class AboutPage{

  todoDataRef$: FirebaseListObservable<Todo[]>;
  todo = {} as Todo;
  completed = 0;
  selectedDay = new Date();
  month = this.selectedDay.getMonth()+1;
  year = this.selectedDay.getFullYear();

  constructor(private actionSheetCtrl: ActionSheetController ,public navCtrl: NavController, public navParams: NavParams,
  private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private toast: ToastController) {
          this.afAuth.authState.take(1).subscribe(auth => {
          this.todoDataRef$ = this.afDatabase.list(`todo/${auth.uid}`);
          });
    }

    selectTodoItem(todo: Todo){

      this.actionSheetCtrl.create({
        title: `${todo.Title}`,
        buttons: [
        {
            text: 'Mark As Completed',
            role: 'destructive',
            cssClass: "completed",
            handler: () =>{
             this.todoDataRef$.remove(todo.$key);
            if (this.todoDataRef$.remove(todo.$key)){
              this.afAuth.authState.take(1).subscribe(auth => {
                  this.afDatabase.object(`completed/${auth.uid}/${this.year}/${this.month}`).$ref
                  .ref.transaction(completed => {
                      if (completed === null) {
                          return completed = 1;
                      } else {
                          return completed + 1;
                      }
                  });
              });
            }
          }
        },
            {
              text: 'Edit',
              cssClass: "edit",
              handler: () =>{
               this.navCtrl.push(EditpagePage, {todoId: todo.$key});
              }
          },

            {
              text: 'Cancel',
              role: 'cancel',
              handler: () =>{
               console.log("Canceled");
                }
            }
        ]
      }).present();
    }



    addtodo(){
    this.navCtrl.push(AddtodoPage);
    }


 }
