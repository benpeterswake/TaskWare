import { Component } from '@angular/core';
import { NavController, NavParams,  ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { SuccessPage } from '../success/success';
declare var window: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  ProfileRef$: FirebaseObjectObservable<Profile>;
  userId;
  image: any;
  public Fbref:any;

  constructor(private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fileChooser: FileChooser,
    private file: File,
    private camera: Camera,
    private toast: ToastController) {
    afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
      this.ProfileRef$ = this.afDatabase.object(`profile/${user.uid}`);
      let storageRef = firebase.storage().ref().child(`${user.uid}/image`);
      storageRef.getDownloadURL().then(url => this.image = url);
    });
      this.Fbref = firebase.storage().ref();
    }

  choose(){

    const options = {
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType:this.camera.MediaType.ALLMEDIA,
      destinationType:this.camera.DestinationType.DATA_URL
    }
    let res = this.camera.getPicture(options).then(fileuri => {
      window.resolveLocalFileSystemURL("file://"+fileuri,FE => {
        FE.file(file=> {
          const FR = new FileReader()
          FR.onloadend = (res:any) => {
            let AF = res.target.result
            let blob = new Blob([new Uint8Array(AF)], {type: 'image/jpeg'})
            this.upload(blob);
          };
          FR.readAsArrayBuffer(file);
        });
      });
    });
  }

  upload(blob: Blob){
      this.afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.Fbref.child(`${user.uid}/image`).put(blob);
      });
      this.navCtrl.push(SuccessPage);
  }

  signOut(){
    this.afAuth.auth.signOut()
  }﻿

  createProfile(profile: Profile) {
  this.ProfileRef$.update(profile);
  this.navCtrl.pop();
  }



}
