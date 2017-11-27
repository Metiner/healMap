import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SignupPage} from "../signup/signup";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  SignupPage = SignupPage;
  HomePage = HomePage;
  constructor(public navCtrl: NavController) {
  }

  // Standart login
  onLogin(form:NgForm){

  }
  // Facebook login
  onFacebookLogin(){

  }
  // Google login
  onGoogleLogin(){

  }

  // Onsignup Page
  onSignUp(){
    this.navCtrl.push(this.SignupPage);
  }

  // Continue As a guest
  onGuest(){
    this.navCtrl.popToRoot();
  }
}
