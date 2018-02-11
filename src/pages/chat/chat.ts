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
  interval;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib,
              public platform:Platform) {




      this.thread = this.navParams.data;

      this.platform.ready().then(()=>{

        this.setSenderAndReceiver();
        this.initializeMessagesQueue().then(()=>{
          this.scrollToEndOfChat(0);
          this.intervallyGetThread();
        })
      })

  }

  ionViewWillLeave(){
    clearInterval(this.interval);
  }

  setSenderAndReceiver(){

    if(this.thread.sender_id.id == this.healMapLib.provider.user.id){
      this.sender = this.thread.receiver_id;
      this.receiver = this.healMapLib.provider;
    }else{
      this.sender = this.thread.sender_id;
      this.receiver = this.thread.receiver_id;
    }
  }

  initializeMessagesQueue():Promise<boolean>{


    if(this.thread.json_body.hasOwnProperty("messages")){
      for(let i=0;i<this.thread.json_body.messages.length;i++){

        if(this.thread.json_body.messages[i].user_id == this.healMapLib.provider.user.id){
          this.thread.json_body.messages[i].isMessageFromCurrentUser = true;
        }
        else{
          this.thread.json_body.messages[i].isMessageFromCurrentUser = false;
        }
      }
    }
    return new Promise(resolve => {

      resolve(true);
    })
  }

  scrollToEndOfChat(duration){
    setTimeout(()=>{
      this.content.scrollToBottom(duration);
    },500)
  }

  async sendMessage(form:NgForm){

    await this.healMapLib.sendMessage(this.thread.id,form.value.messageBody).then(success=>{
      this.thread.json_body.messages = success.json().json_body.messages;

    }).catch(error=>{
      });
    await this.initializeMessagesQueue().then(success=>{

      this.scrollToEndOfChat(1000);
    });

    form.resetForm();

  }

  intervallyGetThread(){

     this.interval = setInterval(()=>{
     this.healMapLib.getThreadById(this.thread.id).then(success=>{

       this.thread = success.json();
       this.setSenderAndReceiver();
       this.initializeMessagesQueue().then(()=>{
         this.scrollToEndOfChat(0);
       })
     })
   },3000);
  }
}
