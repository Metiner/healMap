import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HealMapLib} from "../../services/healMapLib";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {


  threads = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib) {

    this.healMapLib.getThread().then(success =>{
      this.threads = success.json();
      console.log(this.threads);

    }).catch(error=>{
      this.healMapLib.showToast(error,3000,"bottom");
    })
  }
  calculateTime(time):string{
    return "";
  }



}
