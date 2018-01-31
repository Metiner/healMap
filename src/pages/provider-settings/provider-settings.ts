import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {HealMapLib} from "../../services/healMapLib";
import {SetLocationOnMapPage} from "../set-location-on-map/set-location-on-map";
import {ProviderPage} from "../provider/provider";
@IonicPage()
@Component({
  selector: 'page-provider-settings',
  templateUrl: 'provider-settings.html',
})
export class ProviderSettingsPage {

  photoTaken = false;
  base64Image = "";
  base64ImageToUpload = "";
  profile:any = {};
  selectedLocation:any={};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public camera:Camera,
              public popover:PopoverController,
              public healMapLib:HealMapLib) {
    this.profile = HealMapLib.user;
  }

  ionViewWillEnter(){
    let markers = this.navParams.get("markers");
  }


  async onProfileChange(form) {

    let flag = true;

    if(form.value.password != form.value.password_confirmation){
      this.healMapLib.showToast("Passwords are not matching!",3000,"bottom");
    }
    else{
      if(form.value.name != "" || form.value.surname != "" || this.photoTaken || this.selectedLocation.hasOwnProperty('lat') || form.description != "" || form.value.password != ""){

        if(this.selectedLocation.hasOwnProperty('lat')){
          await this.healMapLib.updateLocation(this.selectedLocation.lat,this.selectedLocation.lng).then(success=>{
            if(this.selectedLocation.lat != success.json().lat || this.selectedLocation.lat != success.json().lng){
              ProviderPage.latLng = {lat:success.json().lat,lng:success.json().lng};
            }
          }).catch(error=>{
            flag = false;
          })
        }
        if(form.value.name != "" || form.value.surname != "" || this.photoTaken || form.value.password != "" ){

          await this.healMapLib.updateUserInfo(form,this.base64ImageToUpload).then(success=>{

            HealMapLib.user = success.json().user;
          })
            .catch(error=>{
              flag = false;
          });
          }
        if(form.value.description != ""){

          await this.healMapLib.updateProviderInfo(form.value.description,this.profile.provider_id).then(success=>{
            ProviderPage.description = success.json().description;
            // ProviderPage.description(response.json().user);
          }).catch(error=>{
            flag = false;
          })
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

  selectLocationOnMap(){
    var self = this;
    let callBack = function (params) {
      return new Promise(((resolve, reject) => {
        if(params[0] != undefined){
          self.selectedLocation = {lat:params[0].position.lat(),lng:params[0].position.lng()}
          this.healMapLib.showToast("Location has been set",3000,"bottom");
          }
        resolve(this.selectedLocation);
      }))
    }
    this.navCtrl.push(SetLocationOnMapPage,{
      callback: callBack
    });
  }

}
