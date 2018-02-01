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
              private healMapLib:HealMapLib) {
    this.setItemsBooleanOpposite();
  }

  // Standart login
  async onLogin(form:NgForm){
    await this.healMapLib.login(form.value.email, form.value.password).then(success=>{
      if(success){

        this.setItemsBooleanOpposite();
        this.navCtrl.setRoot(MapPage);

      }
    }).catch(error=>{
      console.log(error);
      }
    )
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
