import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormInputUserPage } from './form-input-user';

@NgModule({
  declarations: [
    FormInputUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FormInputUserPage),
  ],
})
export class FormInputUserPageModule {}
