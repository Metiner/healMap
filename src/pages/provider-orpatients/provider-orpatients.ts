import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupPage} from "../signup/signup";

/**
 * Generated class for the ProviderOrpatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-orpatients',
  templateUrl: 'provider-orpatients.html',
})
export class ProviderOrpatientsPage {

  providerSignUpPage = SignupPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  providerSignUp(){
    this.navCtrl.push(this.providerSignUpPage);
  }


}
