import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HealMapLib} from "../../services/healMapLib";
import {ChatPage} from "../chat/chat";

/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  chats=[];
  thereIsNoChatMessage = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib:HealMapLib) {

    }

  ionViewWillEnter(){
    this.initialize();
  }
  initialize(){
    this.healMapLib.getThread().then(success=>{
      this.chats = success.json();
      console.log(this.chats)

      if(success.json().length < 1){
        this.thereIsNoChatMessage = true;
      }
      else{
        this.thereIsNoChatMessage = false;
      }

      for(let i=0;i<this.chats.length;i++){
        if(this.chats[i].json_body.hasOwnProperty("messages") && this.chats[i].state == 1){

          this.chats[i].lastMessage = this.getLastMessage(this.chats[i].json_body.messages);

          if(this.chats[i].sender_id.id == this.healMapLib.provider.user.id){
            this.chats[i].isCurrentUserSender = true;
          }
          else{
            this.chats[i].isCurrentUserSender = false;
          }
        }
      }
    })
  }

  getLastMessage(messages){
    if(messages.length > 0){
      return messages[messages.length-1].message_text;
    }
  }

  onChatPage(chat){
    this.navCtrl.push(ChatPage,chat);
  }

  deleteChat(chat){
    this.chats.splice(this.chats.indexOf(chat),1);
    console.log(this.chats);
  }

  timeCalculation(chat){
      return this.timeConversion(Date.now()-Date.parse(chat.created_at));
  }

  timeConversion(millisec) {

    let seconds = Number((millisec / 1000).toFixed());

    let minutes = Number((millisec / (1000 * 60)).toFixed());

    let hours = Number((millisec / (1000 * 60 * 60)).toFixed());

    let days = Number((millisec / (1000 * 60 * 60 * 24)).toFixed());

    if (seconds < 60) {
      return seconds + " Seconds ago";
    } else if (minutes < 60) {
      return minutes + " Mins ago";
    } else if (hours < 24) {
      return hours + " Hours ago";
    } else {
      return days + " Days ago"
    }
  }
}
