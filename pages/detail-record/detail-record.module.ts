import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailRecordPage } from './detail-record';

@NgModule({
  declarations: [
    DetailRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailRecordPage),
  ],
})
export class DetailRecordPageModule {}
