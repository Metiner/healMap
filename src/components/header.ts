import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {MapPage} from "../pages/map/map";
import {SearchPage} from "../pages/search/search";
@Component({
  selector:'header-component',
  template:`
      <ion-grid>
        <ion-row style="background-color: #1A1A1A">
          <ion-col col-20>
            <button
              ion-button
              clear
              menuToggle>
              <ion-icon style='color: #e8e8e8;margin-top: 15px' name="menu"></ion-icon>
            </button>
          </ion-col>
          <ion-col col-20 offset-30>
            <img (click)="goToMap()" style="height: 100%;width: 100%" src="assets/imgs/dashboard_logo.png">
          </ion-col>
          <ion-col col-10 offset-30 style="display: inline-flex;align-items: center;">
            <button
              right
              ion-button
              icon-only
              clear
              small
              (click)="onSearchPage()">
              <ion-icon style="color:lightgray" name="search"></ion-icon>
            </button>
          </ion-col>
        </ion-row>
      </ion-grid>
    `
})
export class HeaderComponent{

  constructor(public navCtrl:NavController){

  }

  goToMap(){
   this.navCtrl.setRoot(MapPage);
  }

  onSearchPage(){
    this.navCtrl.push(SearchPage);
  }
}
