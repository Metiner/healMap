import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {Provider} from "../../models/provider";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  patient: Provider;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams){
        this.patient = this.navParams.data;
    }
  }

  goBack(){
    this.navCtrl.pop();
  }
}
