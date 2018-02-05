import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from "../../models/provider";

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

  provider:Provider;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      if(this.navParams.data){
        this.provider = this.navParams.data;
      }
  }


}
