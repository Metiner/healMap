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
import {Provider} from "../models/provider";
import {NotificationsPage} from "../pages/notifications/notifications";
import {OneSignal} from "@ionic-native/onesignal";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild('nav') nav: NavController;
  isAuthenticated = false;
  currentUser:Provider;
  thereIsNewNotification = false;
  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private eventCtrl:Events,
              private healMapLib:HealMapLib,
              private oneSignal:OneSignal) {


    this.eventCtrl.subscribe("user.login", () => {
      this.isAuthenticated = true
      this.currentUser = this.healMapLib.provider;
      this.checkNotification();

    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.oneSignal.startInit('5fda7a9c-8d9f-4db7-aee0-7d39f419b199', '678868701206');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();


    });


  }

  ionViewWillEnter(){
    this.currentUser = this.healMapLib.provider;
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
    this.healMapLib.showToast("KURTAR BENİ",1000,"bottom");
  }
  onSettings(){
    this.nav.push(SettingsPage);
    this.menuCtrl.close();
  }
  onLogout(){

    this.healMapLib.logOutFromStorageAndAuth();
    this.menuCtrl.close();
    this.nav.popToRoot();
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

        if(this.healMapLib.provider.user.provider_id!= undefined){
          this.nav.push(ProviderPage,this.healMapLib.provider);
        }else{
          this.nav.push(ProfilePage,this.healMapLib.provider);
        }

    this.menuCtrl.close();
  }

  onNotifications(){
    this.nav.push(NotificationsPage);
    this.menuCtrl.close();
  }

  menuOpened(){
   this.checkNotification();
  }
  checkNotification(){
    this.healMapLib.getThread().then(response=>{
      console.log(response.json());
      for(let i=0;i<response.json().length;i++){
        if(response.json()[i].sender_id.id != this.healMapLib.provider.user.id)
        {
          this.thereIsNewNotification = true;
        }
        break;
      }
    })
  }
}

