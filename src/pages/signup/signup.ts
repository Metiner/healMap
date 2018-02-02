import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {HealMapLib} from "../../services/healMapLib";
import {LoginPage} from "../login/login";

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
  professions = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib: HealMapLib) {
    this.setItemsBooleanOpposite();
    this.healMapLib.getProfessions().subscribe(response=>{
      this.professions = response.json().professions;
    })

  }

  ionViewDidLoad() {
  }


  onSignUp(form:NgForm){

    //check if passwords are different
    if (!form.value.password == form.value.passwordTwo) {
      this.healMapLib.showToast("Parolalar uyuşmamakta", 3000, "bottom");
    } else {

      this.healMapLib.signUp(form).subscribe(data => {

        if (data.json != null) {

          if (data.json() != null && data.json().success) {

            this.healMapLib.token = data.json().user.login_token;
            this.healMapLib.createProviderProfile(form).subscribe(response=>{
              console.log(response);
            });
            this.healMapLib.showToast("Kullanıcı oluşturuldu", 3000, "bottom");
            this.navCtrl.push(LoginPage);

          } else if (data.json().state.code == 1) {
            this.healMapLib.showToast(data.json().state.messages[0], 3500, "bottom");
            form.reset();
          }
        }
      }, error => {
        this.healMapLib.showAlert("", error, ["Tamam"]);
      });
    }
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
