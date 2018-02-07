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
  messages:any[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib) {

      this.thread = this.navParams.data;
      this.sender = this.thread.sender_id;
      this.receiver = this.healMapLib.provider;

  }

  async sendMessage(form){

    await this.healMapLib.sendMessage(this.thread.id,form.value.messageBody).then(success=>{
      this.messages = success.json().json_body.messages;
    }).catch(error=>{
      console.log(error);
    });

  }




}
