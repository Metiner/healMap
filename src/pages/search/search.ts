import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HealMapLib} from "../../services/healMapLib";
import {ProviderPage} from "../provider/provider";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  providers: string[];

  constructor(private healMapLib: HealMapLib,
              private navCtrl: NavController) {
  }

  getItems(ev: any) {

    if (ev.target.value.length > 2) {
      this.healMapLib.search(ev.target.value).then(response => {
        this.providers = response.json();
      });
   }
  }
  goToProfile(provider){
    this.navCtrl.push(ProviderPage,provider);
  }

}


