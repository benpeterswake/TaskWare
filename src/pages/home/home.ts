import { Component, ViewChild, ElementRef } from '@angular/core';
import { Profile } from './../../models/profile';
import { Completed } from './../../models/completed';
import { Todo } from '../../models/todo';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable,  FirebaseListObservable } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';
import { AddtodoPage } from '../addtodo/addtodo';
import { Chart } from 'chart.js';
import firebase from 'firebase';
import "rxjs/Rx";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;
  private lineChart: any;
  selectedDay = new Date();
  todo = {} as Todo;
  userId;
  items;
  image;
  month = this.selectedDay.getMonth()+1;
  year = this.selectedDay.getFullYear();
  xArray: any[] = [];
  yArray: any[] = [];
  //Observables
  profileData: FirebaseObjectObservable<Profile>;
  todoDataRef$: FirebaseListObservable<Todo[]>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    private afDatabase: AngularFireDatabase, public navCtrl: NavController) {
    this.afAuth.authState.take(1).subscribe(auth => {
      //Todo data
      this.todoDataRef$ = this.afDatabase.list(`todo/${auth.uid}` );
      //Profile data
      this.profileData = this.afDatabase.object(`profile/${auth.uid}`);
      //Photo Data
      let storageRef = firebase.storage().ref().child(`${auth.uid}/image`);
      storageRef.getDownloadURL().then(url => this.image = url);
      //Chart Data
      this.items = firebase.database().ref(`completed/${auth.uid}/${this.year}`).orderByKey();
      this.items.on("value", (snapshot) => {
        this.xArray.splice(0,this.xArray.length);
        this.yArray.splice(0,this.yArray.length);
          snapshot.forEach((childSnapshot) => {
            this.xArray.push(childSnapshot.key);
            this.yArray.push(childSnapshot.val());
            });
            this.basicChart(this.xArray, this.yArray);
        });
      });
  }

  basicChart(dataKey, dataValue){

    if (this.xArray[0] === "1"){
      this.xArray[0] = "Jan"
    }
    if (this.xArray[1] === "2"){
      this.xArray[1] = "Feb"
    }
    if (this.xArray[2] === "3"){
      this.xArray[2] = "Mar"
    }
    if (this.xArray[3] === "4"){
      this.xArray[3] = "Apr"
    }
    if (this.xArray[4] === "5"){
      this.xArray[4] = "Jun"
    }
    if (this.xArray[5] === "6"){
      this.xArray[5] = "Jul"
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                  type: 'line',
                  data: {
                      labels: dataKey,
                      datasets: [{
                              label: "Completed",
                              fill: true,
                              lineTension: 0.1,
                              backgroundColor: "rgba(72,138,255,0.4)",
                              borderColor: "rgba(72,138,255,1)",
                              borderCapStyle: 'butt',
                              borderDash: [],
                              borderDashOffset: 0.0,
                              borderJoinStyle: 'miter',
                              pointBorderColor: "rgba(72,138,255,1)",
                              pointBackgroundColor: "#fff",
                              pointBorderWidth: 8,
                              pointHoverRadius: 5,
                              pointHoverBackgroundColor: "rgba(72,138,255,1)",
                              pointHoverBorderColor: "rgba(220,220,220,1)",
                              pointHoverBorderWidth: 2,
                              pointRadius: 3,
                              pointHitRadius: 10,
                              data: dataValue,
                              spanGaps: false,
                        }]
                  }
              });
              console.log(this.xArray)
              console.log(this.yArray)
  }


  async refreshChart() {
    let res = await this.navCtrl.setRoot(this.navCtrl.getActive().component);
    if (res) {
      var element = document.getElementById("target");
      element.scrollIntoView();
    }
  }
  switchTabs() {
    this.navCtrl.parent.select(1);
  }

  updateProfile(){
    this.navCtrl.push(ProfilePage);
  }


}
