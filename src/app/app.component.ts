import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {MapPage} from "../pages/map/map";
import {ProviderOrpatientsPage} from "../pages/provider-orpatients/provider-orpatients";
import {SignupPage} from "../pages/signup/signup";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SignupPage;
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

