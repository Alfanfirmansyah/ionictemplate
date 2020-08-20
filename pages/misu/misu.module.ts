import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisuPage } from './misu';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    MisuPage,
  ],
  imports: [
    IonicPageModule.forChild(MisuPage),
    SuperTabsModule
  ],
})
export class MisuPageModule {}
