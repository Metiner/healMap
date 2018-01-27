import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {HealMapLib} from "../../services/healMapLib";
import {SetLocationOnMapPage} from "../set-location-on-map/set-location-on-map";
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
  selectedLocation = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public camera:Camera,
              public popover:PopoverController,
              public healMapLib:HealMapLib) {
    console.log(HealMapLib.user);
    this.profile = HealMapLib.user;
  }

  ionViewWillEnter(){
    let markers = this.navParams.get("markers");
    console.log(markers);
  }

  onProfileChange(form){

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

    let callBack = function (params) {
      return new Promise(((resolve, reject) => {
        if(params[0] != undefined){
          this.selectedLocation = {lat:params[0].position.lat(),lng:params[0].position.lng()}
          this.healMapLib.showToast("Location has been set",3000,"bottom");
          }
        resolve();
      }))
    }
    this.navCtrl.push(SetLocationOnMapPage,{
      callback: callBack
    });
  }

}
