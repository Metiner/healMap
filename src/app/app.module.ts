import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HealMapLib} from "../services/healMapLib";
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {ProviderPage} from "../pages/provider/provider";
import {HeaderComponent} from "../components/header";
import {ProfilePage} from "../pages/profile/profile";
import {PhotosPage} from "../pages/photos/photos";
import {ChatListPage} from "../pages/chat-list/chat-list";
import {NotificationsPage} from "../pages/notifications/notifications";
import {GoogleMaps} from "@ionic-native/google-maps";
import {ChatPage} from "../pages/chat/chat";
import {ExpertsPage} from "../pages/experts/experts";
import {ReviewsPage} from "../pages/reviews/reviews";
import {WriteReviewPage} from "../pages/write-review/write-review";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProviderPage,
    HeaderComponent,
    ProfilePage,
    PhotosPage,
    ChatListPage,
    NotificationsPage,
    ChatPage,
    ExpertsPage,
    ReviewsPage,
    WriteReviewPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProviderPage,
    ProfilePage,
    PhotosPage,
    ChatListPage,
    NotificationsPage,
    ChatPage,
    ExpertsPage,
    ReviewsPage,
    WriteReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    HealMapLib,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
