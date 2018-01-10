import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {PatientSignUpPage} from "../patient-sign-up/patient-sign-up";

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
  patientSignUpPage = PatientSignUpPage;
  static userTypeDecision; // 1-patient,2-provider.

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  providerSignUp(){
    ProviderOrpatientsPage.userTypeDecision = 2;
    this.navCtrl.push(this.providerSignUpPage);
  }

  patientSignUp(){
    ProviderOrpatientsPage.userTypeDecision = 1;
    this.navCtrl.push(this.patientSignUpPage);
  }

}
