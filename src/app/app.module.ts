import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ElasticModule } from 'angular2-elastic';
import { FIREBASE_CRED } from './firebase.cred';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { EditpagePage } from '../pages/editpage/editpage';
import { TabsPage } from '../pages/tabs/tabs';
import { SliderPage } from '../pages/slider/slider';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { AddtodoPage } from '../pages/addtodo/addtodo';
import { SuccessPage } from '../pages/success/success';
import { PrivacyPage } from '../pages/privacy/privacy';
import { CalendarPage } from '../pages/calendar/calendar';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SliderPage,
    EditpagePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AddtodoPage,
    SuccessPage,
    CalendarPage,
    PrivacyPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true, scrollAssist: false, autoFocusAssist: false}),
    AngularFireModule.initializeApp(FIREBASE_CRED),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ElasticModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SliderPage,
    EditpagePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AddtodoPage,
    SuccessPage,
    CalendarPage,
    PrivacyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    File,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
