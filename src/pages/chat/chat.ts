import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from "../../models/provider";
import {HealMapLib} from "../../services/healMapLib";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  sender:Provider;
  receiver:Provider;
  thread:any;
  showLoadOldMessagesButton = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib) {

      this.thread = this.navParams.data;

      if(this.thread.sender_id.id == this.healMapLib.provider.user.id){
        this.sender = this.thread.receiver_id;
        this.receiver = this.healMapLib.provider;
      }else{
        this.sender = this.thread.sender_id;
        this.receiver = this.thread.receiver_id;
      }



      for(let i=0;i<this.thread.messages.length;i++){
        if(this.thread.messages[i].user_id == this.healMapLib.provider.user.id){
          this.thread.messages[i].isMessageFromCurrentUser = true;
        }
        else{
          this.thread.messages[i].isMessageFromCurrentUser = false;
        }

      }
  }

  async sendMessage(form){

    await this.healMapLib.sendMessage(this.thread.id,form.value.messageBody).then(success=>{
      this.thread.messages = success.json().json_body.messages;
    }).catch(error=>{
      console.log(error);
    });

  }




}
