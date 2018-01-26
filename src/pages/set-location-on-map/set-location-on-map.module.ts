import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocationOnMapPage } from './set-location-on-map';

@NgModule({
  declarations: [
    SetLocationOnMapPage,
  ],
  imports: [
    IonicPageModule.forChild(SetLocationOnMapPage),
  ],
})
export class SetLocationOnMapPageModule {}
