import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Provider} from "../../models/provider";
import {HealMapLib} from "../../services/healMapLib";
import {NgForm} from "@angular/forms";

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

  @ViewChild(Content) content:Content;


  sender:Provider;
  receiver:Provider;
  thread:any;
  showLoadOldMessagesButton = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib,
              public platform:Platform) {



      this.thread = this.navParams.data;

      this.platform.ready().then(()=>{

        this.setSenderAndReceiver();
        this.initializeMessagesQueue().then(()=>{
          this.scrollToEndOfChat();
        })
      })

  }

  setSenderAndReceiver(){

    console.log("1");
    if(this.thread.sender_id.id == this.healMapLib.provider.user.id){
      this.sender = this.thread.receiver_id;
      this.receiver = this.healMapLib.provider;
    }else{
      this.sender = this.thread.sender_id;
      this.receiver = this.thread.receiver_id;
    }
  }

  initializeMessagesQueue():Promise<boolean>{


    for(let i=0;i<this.thread.json_body.messages.length;i++){

      if(this.thread.json_body.messages[i].user_id == this.healMapLib.provider.user.id){
        this.thread.json_body.messages[i].isMessageFromCurrentUser = true;
      }
      else{
        this.thread.json_body.messages[i].isMessageFromCurrentUser = false;
      }
    }
    return new Promise(resolve => {

      resolve(true);
    })
  }

  scrollToEndOfChat(){
    console.log("4");
    setTimeout(()=>{
      this.content.scrollToBottom(1000);
    },500)
  }

  async sendMessage(form:NgForm){

    await this.healMapLib.sendMessage(this.thread.id,form.value.messageBody).then(success=>{
      this.thread.json_body.messages = success.json().json_body.messages;

    }).catch(error=>{
      });
    await this.initializeMessagesQueue().then(success=>{

      this.scrollToEndOfChat();
    });

    form.resetForm();

  }




}
