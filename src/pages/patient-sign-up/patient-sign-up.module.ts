import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientSignUpPage } from './patient-sign-up';

@NgModule({
  declarations: [
    PatientSignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientSignUpPage),
  ],
})
export class PatientSignUpPageModule {}
