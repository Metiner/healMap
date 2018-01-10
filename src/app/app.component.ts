import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {MapPage} from "../pages/map/map";
import {User} from "../models/user";
import {HealMapLib} from "../services/healMapLib";
import {ChatListPage} from "../pages/chat-list/chat-list";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MapPage;
  @ViewChild('nav') nav: NavController;
  isAuthenticated = false;
  currentUser:User;
  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private eventCtrl:Events,
              private healMapLib:HealMapLib) {
    this.eventCtrl.subscribe("user.login", () => {
      this.isAuthenticated = true
      this.currentUser = HealMapLib.user;
    });
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
  onChats(){
    this.nav.push(ChatListPage);
    this.menuCtrl.close();
  }
  onEmergencyNumbers(){
    this.healMapLib.showToast("Q",1000,"bottom");
  }
  onSettings(){
    this.healMapLib.showToast("Ciuv",1000,"bottom");
  }
  onLogout(){

    this.healMapLib.logOutFromStorageAndAuth();
    this.menuCtrl.close();
    this.nav.setRoot(MapPage);
    this.healMapLib.showToast("Çıkış yapıldı",2000,"bottom");

    //Executes the code after waiting a second.
    setTimeout(()=>{
      this.isAuthenticated = false;
    },1000)

  }
  reviewOnStore(){
    this.healMapLib.showToast("BASMA NE BASIYON",1000,"bottom");
  }
}

