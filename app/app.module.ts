import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from'@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MprojectPage } from '../pages/mproject/mproject';
import { MrecordPage } from '../pages/mrecord/mrecord';
import { FormInputProjectPage } from '../pages/form-input-project/form-input-project';
import { FormEditProjectPage } from '../pages/form-edit-project/form-edit-project';
import { FormEditUserPage } from '../pages/form-edit-user/form-edit-user';
import { FormEditRecordPage } from '../pages/form-edit-record/form-edit-record';
import { FormEditIsuPage } from '../pages/form-edit-isu/form-edit-isu';
import { FormInputRecordPage } from '../pages/form-input-record/form-input-record';
import { DetailRecordPage } from '../pages/detail-record/detail-record';
import { DetailIsuPage } from '../pages/detail-isu/detail-isu';
import { ViewedUsersPage } from '../pages/viewed-users/viewed-users';
import { AttachmentPage } from '../pages/attachment/attachment';
import { LogoutPage } from '../pages/logout/logout';
import { MactivityplanPage } from '../pages/mactivityplan/mactivityplan';
import { DetailActivityplanPage } from '../pages/detail-activityplan/detail-activityplan';
import { FormEditPlanPage } from '../pages/form-edit-plan/form-edit-plan';
import { MuserPage } from '../pages/muser/muser';
import { FormInputUserPage } from '../pages/form-input-user/form-input-user';
import { FormInputActivityplanPage } from '../pages/form-input-activityplan/form-input-activityplan';
import { FormInputIsuPage } from '../pages/form-input-isu/form-input-isu';
import { MisuPage } from '../pages/misu/misu';
import { HelpPage } from '../pages/help/help';
import { ReportUtamaPage } from '../pages/report-utama/report-utama';
import { ReportIsuPage } from '../pages/report-isu/report-isu';
import { ReportActivityprojectsPage } from '../pages/report-activityprojects/report-activityprojects';
import { ReportActivityplanPage } from '../pages/report-activityplan/report-activityplan';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from '@ionic-native/file-chooser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { FileTransfer, FileTransferObject } from'@ionic-native/file-transfer';
import { File } from'@ionic-native/file';
import { FilePath } from'@ionic-native/file-path';
import { Camera } from'@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CommonProvider } from '../providers/common/common';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HTTP } from '@ionic-native/http';
import { OneSignal } from '@ionic-native/onesignal';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MprojectPage,
    MrecordPage,
    FormInputProjectPage,
    FormEditProjectPage,
    FormInputRecordPage,
    DetailRecordPage,
    LogoutPage,
    AttachmentPage,
    FormEditRecordPage,
    MactivityplanPage,
    DetailActivityplanPage,
    FormEditPlanPage,
    FormInputActivityplanPage,
    MuserPage,
    FormInputUserPage,
    FormEditUserPage,
    MisuPage,
    FormInputIsuPage,
    FormEditIsuPage,
    DetailIsuPage,
    HelpPage,
    ViewedUsersPage,
    ReportUtamaPage,
    ReportIsuPage,
    ReportActivityprojectsPage,
    ReportActivityplanPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SuperTabsModule.forRoot(),
    
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MprojectPage,
    MrecordPage,
    FormInputProjectPage,
    FormEditProjectPage,
    FormInputRecordPage,
    DetailRecordPage,
    ViewedUsersPage,
    LogoutPage,
    AttachmentPage,
    FormEditRecordPage,
    MactivityplanPage,
    DetailActivityplanPage,
    FormEditPlanPage,
    FormInputActivityplanPage,
    MuserPage,
    FormInputUserPage,
    FormEditUserPage,
    MisuPage,
    FormInputIsuPage,
    FormEditIsuPage,
    DetailIsuPage,
    HelpPage,
    ReportUtamaPage,
    ReportIsuPage,
    ReportActivityprojectsPage,
    ReportActivityplanPage,

 

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    CommonProvider,
    FileTransfer, 
    FileTransferObject,
    File,
    FilePath,
    Camera,
    FileChooser,
    InAppBrowser,
    FileOpener,
    PhotoViewer,
    AndroidPermissions,
    HTTP,
    OneSignal
  ]
})
export class AppModule {}
