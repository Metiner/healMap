import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HealMapLib} from "../../services/healMapLib";
import {ChatPage} from "../chat/chat";

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


  notifications = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib) {

    this.healMapLib.getThread().then(success =>{

      let temp =[];
      temp = success.json();

      for(var i=0;i<temp.length;i++){
        if(temp[i].state == 0)
          this.notifications.push(temp[i]);
      }

    }).catch(error=>{
      this.healMapLib.showToast(error,3000,"bottom");
    })
  }

  async onAcceptNotification(notification){
    await this.healMapLib.acceptThreadRequest(notification.id).then(success=>{
      console.log(success.json());
      //this.navCtrl.push(ChatPage);
    }).catch(error=>{
      console.log(error);
      this.healMapLib.showToast("Oops:( Something happened.",3000,"bottom");
    });
  }
  async onRejectNotification(notification){
    await this.healMapLib.rejectThreadRequest(notification.id).then(success=>{
      console.log(success.json());
      //this.navCtrl.push(ChatPage);
    }).catch(error=>{
      console.log(error);
      this.healMapLib.showToast("Oops:( Something happened.",3000,"bottom");
    });
  }


  calculateTime(time):string{
    return "";
  }



}
