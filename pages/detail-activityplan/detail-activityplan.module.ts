import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailActivityplanPage } from './detail-activityplan';

@NgModule({
  declarations: [
    DetailActivityplanPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailActivityplanPage),
  ],
})
export class DetailActivityplanPageModule {}
