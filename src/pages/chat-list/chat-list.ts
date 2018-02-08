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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib:HealMapLib) {

    this.healMapLib.getThread().then(success=>{
      this.chats = success.json();

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

}
