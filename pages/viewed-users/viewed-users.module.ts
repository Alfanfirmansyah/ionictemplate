import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewedUsersPage } from './viewed-users';

@NgModule({
  declarations: [
    ViewedUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewedUsersPage),
  ],
})
export class ViewedUsersPageModule {}
