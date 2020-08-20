import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormEditProjectPage } from './form-edit-project';

@NgModule({
  declarations: [
    FormEditProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(FormEditProjectPage),
  ],
})
export class FormEditProjectPageModule {}
