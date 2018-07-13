import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { PrivacyPage } from '../privacy/privacy';
import { HomePage } from '../home/home';
import * as firebase from 'firebase/app';

declare var window: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild(Navbar) navBar: Navbar;
  profile = {} as Profile;
  ProfileRef$: FirebaseObjectObservable<Profile>;
  userId: any;
  image: any;
  progress: any;
  public Fbref:any;

  constructor(private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fileChooser: FileChooser,
    private file: File,
    private camera: Camera) {
    afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid; }
      this.ProfileRef$ = this.afDatabase.object(`profile/${user.uid}`);
      let storageRef = firebase.storage().ref().child(`${user.uid}/image`);
      storageRef.getDownloadURL().then(url => this.image = url);
    });
      this.Fbref = firebase.storage().ref();
    }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.setRoot(HomePage);
    }
  }

  choose(){
    const options = {
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType:this.camera.MediaType.ALLMEDIA,
      destinationType:this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options).then(fileuri => {
      window.resolveLocalFileSystemURL(("file://"+fileuri).toLowerCase(),FE => {
        FE.file(file=> {
          const FR = new FileReader()
          FR.onloadend = (res:any) => {
            let AF = res.target.result
            let blob = new Blob([new Uint8Array(AF)], {type: 'image/jpeg'});
            this.upload(blob);
          };
          FR.readAsArrayBuffer(file);
        });
      });
    });
  }

  upload(blob: Blob){
      this.progress = 1;
      this.afAuth.authState.subscribe((user) => {
        if (user) { this.userId = user.uid }
        let upload = this.Fbref.child(`${user.uid}/image`).put(blob)
        upload.on('state_changed', (snapshot) =>{
          this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break;
          }
        }, (error) => {
          alert("There was an error." + error)
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          upload.snapshot.ref.getDownloadURL().then((url) => {
            alert("Successful Upload!")
            this.image = url;
            this.progress = undefined;
          });
        });
      });
  }

  signOut(){
    this.afAuth.auth.signOut()
  }﻿

  createProfile(profile: Profile) {
    this.ProfileRef$.update(profile);
    this.navCtrl.setRoot(HomePage);
  }

  toPrivacyPage(){
    this.navCtrl.push(PrivacyPage);
  }



}
