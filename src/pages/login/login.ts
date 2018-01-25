import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ProviderOrpatientsPage} from "../provider-orpatients/provider-orpatients";
import {HealMapLib} from "../../services/healMapLib";
import {MapPage} from "../map/map";

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

  providerOrPatientPage = ProviderOrpatientsPage;

  itemone=true;
  itemtwo=true;
  itemthree=true;
  itemfour=true;
  itemfive=true;
  itemsix=true;
  itemseven=true;
  itemeight=true;
  itemnine=true;
  itemten=true;
  itemeleven=true;

  constructor(public navCtrl: NavController,
              private healMapLib:HealMapLib,
              private loadingCtrl:LoadingController,
              private eventCtrl:Events) {
    this.setItemsBooleanOpposite();
  }

  // Standart login
  onLogin(form:NgForm){
    this.healMapLib.login(form.value.email, form.value.password).subscribe(data=>{

      // this.onLoginLogo = true;
      if(data.json() != null && data.json().success == true ){

        this.setItemsBooleanOpposite();
            setTimeout( ()=>{

            this.setStorageAndUserInfoAfterSuccessLogin(data.json());

          }
          ,1100);

      }
    },error => {

      this.healMapLib.showAlert(" ","Yanlış e-mail veya parola girdiniz.",["Tamam"]);
    })
  }


  //sets the user info to benimfirsatimlib's static user variable and stores token in local storage
  setStorageAndUserInfoAfterSuccessLogin(data){
    const loading = this.loadingCtrl.create({
      content : "Giriş yapılıyor..."
    });
    loading.present();

    this.healMapLib.setUserInfoAfterLogin(data.user);
    this.eventCtrl.publish('user.login',' ');
    this.healMapLib.storageControl("user",data);
    this.navCtrl.setRoot(MapPage);
    loading.dismiss();
    this.healMapLib.showToast("Giriş yapıldı",1500,"bottom");
  }


  // Onsignup Page
  onSignUp(){
    this.navCtrl.push(this.providerOrPatientPage);
  }

  // Continue As a guest
  onGuest(){
    this.navCtrl.popToRoot();
  }


  setItemsBooleanOpposite(){

    setTimeout(()=>{
      this.itemone=! this.itemone;
    },0)
    setTimeout(()=>{
      this.itemtwo=! this.itemtwo;
    },100)
    setTimeout(()=>{
      this.itemthree=! this.itemthree;
    },200)
    setTimeout(()=>{
      this.itemfour=! this.itemfour;
    },300)
    setTimeout(()=>{
      this.itemfive=! this.itemfive;
    },400)
    setTimeout(()=>{
      this.itemsix=! this.itemsix;
    },500)
    setTimeout(()=>{
      this.itemseven=! this.itemseven;
    },600)
    setTimeout(()=>{
      this.itemeight=! this.itemeight;
    },700)
    setTimeout(()=>{
      this.itemnine=! this.itemnine;
    },800)
    setTimeout(()=>{
      this.itemten=! this.itemten;
    },900)
    setTimeout(()=>{
      this.itemeleven=! this.itemeleven;
    },1000)
  }
}
