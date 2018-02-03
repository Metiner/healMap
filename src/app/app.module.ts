import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Camera} from "@ionic-native/camera";

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
import {ChatPage} from "../pages/chat/chat";
import {ExpertsPage} from "../pages/experts/experts";
import {ReviewsPage} from "../pages/reviews/reviews";
import {WriteReviewPage} from "../pages/write-review/write-review";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Geolocation} from "@ionic-native/geolocation";
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import {Network} from "@ionic-native/network";
import {GoogleMapsCluster} from "../providers/google-maps-cluster/google-maps-cluster";
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { HttpModule} from "@angular/http";
import {MapPage} from "../pages/map/map";
import {ProviderOrpatientsPage} from "../pages/provider-orpatients/provider-orpatients";
import {PatientSignUpPage} from "../pages/patient-sign-up/patient-sign-up";
import {IonicStorageModule} from "@ionic/storage";
import {SettingsPage} from "../pages/settings/settings";
import {ProfileSettingsPage} from "../pages/profile-settings/profile-settings";
import {SetLocationOnMapPage} from "../pages/set-location-on-map/set-location-on-map";
import {ProviderSettingsPage} from "../pages/provider-settings/provider-settings";
import {LaunchNavigator, LaunchNavigatorOptions} from "@ionic-native/launch-navigator";

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
    WriteReviewPage,
    MapPage,
    ProviderOrpatientsPage,
    PatientSignUpPage,
    SettingsPage,
    ProfileSettingsPage,
    SetLocationOnMapPage,
    ProviderSettingsPage,
    WriteReviewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({driverOrder: ['indexeddb', 'websql', 'sqlite']})
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
    WriteReviewPage,
    MapPage,
    ProviderOrpatientsPage,
    PatientSignUpPage,
    SettingsPage,
    ProfileSettingsPage,
    ProviderSettingsPage,
    SetLocationOnMapPage,
    WriteReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    HealMapLib,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    ConnectivityServiceProvider,
    GoogleMapsCluster,
    GoogleMapsProvider,
    Camera,
    LaunchNavigator
  ]
})
export class AppModule {}
