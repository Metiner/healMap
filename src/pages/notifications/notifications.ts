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
  thereIsNoNotifications = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib) {

  }

  ionViewWillEnter(){
    this.initialize();
  }

  initialize(){
    this.notifications=[];
    this.healMapLib.getThread().then(success =>{


      if(success.json().length < 1){
        this.thereIsNoNotifications = true;
      }else{
        this.thereIsNoNotifications = false;
      }


      let temp =[];
      temp = success.json();

      for(var i=0;i<temp.length;i++){
        if(temp[i].state == 0 && temp[i].sender_id.id != this.healMapLib.provider.user.id){
          this.notifications.push(temp[i]);
        }
        //if(this.healMapLib.provider.user.id)
      }

    }).catch(error=>{
      this.healMapLib.showToast(error,3000,"bottom");
    })
  }

  async onAcceptNotification(notification){
    await this.healMapLib.acceptThreadRequest(notification.id).then(success=>{
      this.navCtrl.push(ChatPage,notification);
    }).catch(error=>{
      console.log(error);
      this.healMapLib.showToast("Oops:( Something happened.",3000,"bottom");
    });

  }
  async onRejectNotification(notification){
    await this.healMapLib.rejectThreadRequest(notification.id).then(success=>{
      this.initialize();
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
