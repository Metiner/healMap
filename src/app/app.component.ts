import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {ProviderPage} from "../pages/provider/provider";
import {ProfilePage} from "../pages/profile/profile";
import {PhotosPage} from "../pages/photos/photos";
import {ChatListPage} from "../pages/chat-list/chat-list";
import {NotificationsPage} from "../pages/notifications/notifications";
import {SearchPage} from "../pages/search/search";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SearchPage;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onSignin(){
    this.nav.push(LoginPage);
    this.menuCtrl.close();
  }
}

