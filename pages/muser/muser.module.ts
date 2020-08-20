import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuserPage } from './muser';

@NgModule({
  declarations: [
    MuserPage,
  ],
  imports: [
    IonicPageModule.forChild(MuserPage),
  ],
})
export class MuserPageModule {}
