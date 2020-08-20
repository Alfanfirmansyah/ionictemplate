import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormEditRecordPage } from './form-edit-record';

@NgModule({
  declarations: [
    FormEditRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(FormEditRecordPage),
  ],
})
export class FormEditRecordPageModule {}
