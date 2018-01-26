import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderSettingsPage } from './provider-settings';

@NgModule({
  declarations: [
    ProviderSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderSettingsPage),
  ],
})
export class ProviderSettingsPageModule {}
