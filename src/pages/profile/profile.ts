import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Patient} from "../../models/patient";

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

  patient: Patient;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams){
      this.patient = new Patient(this.navParams.get("id"),this.navParams.get("email"),this.navParams.get("name"),this.navParams.get("surname"),this.navParams.get("phone"));
    }
  }
}
