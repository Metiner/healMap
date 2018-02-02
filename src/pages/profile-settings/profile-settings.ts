import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {HealMapLib} from "../../services/healMapLib";
import {User} from "../../models/user";
@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {

  photoTaken = false;
  base64Image = "";
  base64ImageToUpload = "";
  profile:User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public camera:Camera,
              public healMapLib:HealMapLib) {
    this.profile = this.healMapLib.user;
  }

  async onProfileChange(form) {

    let flag = true;

    if(form.value.password != form.value.password_confirmation){
      this.healMapLib.showToast("Passwords are not matching!",3000,"bottom");
    }
    else{
      if(form.value.name != "" || form.value.surname != "" || this.photoTaken  || form.value.password != ""){


        if(form.value.name != "" || form.value.surname != "" || this.photoTaken || form.value.password != "" ){

          await this.healMapLib.updateUserInfo(form,this.base64ImageToUpload).then(success=>{

            this.healMapLib.user = success.json().user;
          })
            .catch(error=>{
              flag = false;
            });
        }
        if(flag){
          this.healMapLib.showToast("Saved",3000,"bottom");
        }else{
          this.healMapLib.showToast("Oops! Something went wrong",3000,"bottom");
        }
      }
    }
  }

  onTakePhoto(){

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.photoTaken = true;
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      let base64 = this.base64Image.split(',');
      this.base64ImageToUpload=base64[1].trim();

    }, (err) => {
      console.log(err);
      this.photoTaken = false;
    });
  }

}
