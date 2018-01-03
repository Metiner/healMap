import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  itemone=true;
  itemtwo=true;
  itemthree=true;
  itemfour=true;
  itemfive=true;
  itemsix=true;
  itemseven=true;
  itemeight=true;
  itemnine=true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setItemsBooleanOpposite();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  onSignUp(form:NgForm){


  }

  setItemsBooleanOpposite() {

    setTimeout(() => {
      this.itemone = !this.itemone;
    }, 0)
    setTimeout(() => {
      this.itemtwo = !this.itemtwo;
    }, 100)
    setTimeout(() => {
      this.itemthree = !this.itemthree;
    }, 200)
    setTimeout(() => {
      this.itemfour = !this.itemfour;
    }, 300)
    setTimeout(() => {
      this.itemfive = !this.itemfive;
    }, 400)
    setTimeout(() => {
      this.itemsix = !this.itemsix;
    }, 500)
    setTimeout(() => {
      this.itemseven = !this.itemseven;
    }, 600)
    setTimeout(() => {
      this.itemeight = !this.itemeight;
    }, 700)
    setTimeout(() => {
      this.itemnine = !this.itemnine;
    }, 800)
  }
}
