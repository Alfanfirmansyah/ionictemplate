import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormEditUserPage } from './form-edit-user';

@NgModule({
  declarations: [
    FormEditUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FormEditUserPage),
  ],
})
export class FormEditUserPageModule {}
