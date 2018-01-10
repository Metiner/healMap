import {Component} from '@angular/core';
@Component({
  selector:'header-component',
  template:`
      <ion-grid>
        <ion-row>
          <ion-col col-20>
            <button
              ion-button
              icon-only
              clear
              small
              menuToggle>
              <img style="height: 100%;width: 100%;border-radius: 50%" src="assets/imgs/pp.png">
            </button>
          </ion-col>
          <ion-col col-20 offset-30>
            <img style="height: 100%;width: 100%" src="assets/imgs/dashboard_logo.png">
          </ion-col>
          <ion-col col-10 offset-30 style="display: inline-flex;align-items: center;">
            <button
              ion-button
              icon-only
              clear
              small
              right
              menuToggle>
              <ion-icon style="color:lightgray" name="notifications"></ion-icon>
            </button>
            <button
              right
              ion-button
              icon-only
              clear
              small
              menuToggle>
              <ion-icon style="color:lightgray" name="search"></ion-icon>
            </button>
          </ion-col>
        </ion-row>
      </ion-grid>
    `
})
export class HeaderComponent{

}
