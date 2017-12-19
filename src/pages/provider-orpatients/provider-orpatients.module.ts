import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderOrpatientsPage } from './provider-orpatients';

@NgModule({
  declarations: [
    ProviderOrpatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderOrpatientsPage),
  ],
})
export class ProviderOrpatientsPageModule {}
