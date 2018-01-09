import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {HealMapLib} from "../../services/healMapLib";
import {LoginPage} from "../login/login";
import {ProviderPage} from "../provider/provider";
import {ProfilePage} from "../profile/profile";

/**
 * Generated class for the PatientSignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-sign-up',
  templateUrl: 'patient-sign-up.html',
})
export class PatientSignUpPage {
  itemone=true;
  itemtwo=true;
  itemthree=true;
  itemfour=true;
  itemfive=true;
  itemsix=true;
  itemseven=true;
  itemeight=true;
  itemnine=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private healMapLib:HealMapLib) {
    this.setItemsBooleanOpposite();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientSignUpPage');
  }


  onSignUp(form:NgForm){
//check if passwords are different
    if(!form.value.password == form.value.passwordTwo){
      this.healMapLib.showToast("Parolalar uyuşmamakta",3000,"bottom");
    }else{

      console.log(form);
      this.healMapLib.signUpPatient(form).subscribe(data=>{

        if(data.json != null){

          if(data.json().id != undefined){
            let patient = this.healMapLib.createPatient(data.json().id,form);
            this.healMapLib.showToast("Kullanıcı oluşturuldu",3000,"bottom");
            this.navCtrl.push(ProfilePage,patient);

          }else{
            this.healMapLib.showToast('E-mail '+data.json().email,3500,"bottom");
            form.reset();
          }
        }
      },error =>{
        this.healMapLib.showAlert("",error,["Tamam"]);
      });
    }

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
  }
}
