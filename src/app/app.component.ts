import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {MapPage} from "../pages/map/map";
import {User} from "../models/user";
import {HealMapLib} from "../services/healMapLib";
import {ChatListPage} from "../pages/chat-list/chat-list";
import {ProfilePage} from "../pages/profile/profile";
import {SignupPage} from "../pages/signup/signup";
import {ProviderPage} from "../pages/provider/provider";
import {SettingsPage} from "../pages/settings/settings";
import {ProviderSettingsPage} from "../pages/provider-settings/provider-settings";
import {SetLocationOnMapPage} from "../pages/set-location-on-map/set-location-on-map";
import {HomePage} from "../pages/home/home";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
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
      this.currentUser = this.healMapLib.user;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }



  onSignin(){
    this.nav.push(HomePage);
    this.menuCtrl.close();
  }
  onChats(){
    this.nav.push(ChatListPage);
    this.menuCtrl.close();
  }
  onEmergencyNumbers(){
    this.healMapLib.showToast("KURTAR BENİ",1000,"bottom");
  }
  onSettings(){
    this.nav.push(SettingsPage);
    this.menuCtrl.close();
  }
  onLogout(){

    this.healMapLib.logOutFromStorageAndAuth();
    this.menuCtrl.close();
    this.nav.setRoot(MapPage);
    this.healMapLib.showToast("Çıkış ",2000,"bottom");

    //Executes the code after waiting a second.
    setTimeout(()=>{
      this.isAuthenticated = false;
    },1000)

  }
  reviewOnStore(){
    this.healMapLib.showToast("UYGULAMANIN İÇİNE HAPSOLDUM",1000,"bottom");
  }

  leaveFeedback(){
    this.healMapLib.showToast("YARDIM ET",1000,"bottom");
  }
  reportBug(){
    this.healMapLib.showToast("SONSUZLUKTA ACI ÇEKİYORUM",1000,"bottom");
  }
  onProfile(){
    this.healMapLib.getUserInfoFromStorage().then(response=>{
        if(response.user.provider_id != undefined){
          this.nav.push(ProviderPage,this.healMapLib.user);
        }else{
          this.nav.push(ProfilePage,this.healMapLib.user);
        }
      })
    this.menuCtrl.close();
  }
}

