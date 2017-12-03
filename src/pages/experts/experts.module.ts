import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpertsPage } from './experts';

@NgModule({
  declarations: [
    ExpertsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertsPage),
  ],
})
export class ExpertsPageModule {}
