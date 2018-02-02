import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfileSettingsPage} from "../profile-settings/profile-settings";
import {ProviderSettingsPage} from "../provider-settings/provider-settings";
import {HealMapLib} from "../../services/healMapLib";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public healMapLib:HealMapLib) {
  }

  toProfileSettings(){
      if(this.healMapLib.user.provider_id != undefined){
        this.navCtrl.push(ProviderSettingsPage);
      }else{
        this.navCtrl.push(ProfileSettingsPage);
      }
  }
}
