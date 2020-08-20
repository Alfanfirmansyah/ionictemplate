

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MactivityplanPage } from '../pages/mactivityplan/mactivityplan';
import { ReportUtamaPage } from '../pages/report-utama/report-utama';
import { LogoutPage } from '../pages/logout/logout';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MprojectPage } from '../pages/mproject/mproject';
import { MrecordPage } from '../pages/mrecord/mrecord';
import { MuserPage } from '../pages/muser/muser';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';
import { MisuPage } from '../pages/misu/misu';
import { HelpPage } from '../pages/help/help';
import { OneSignal } from '@ionic-native/onesignal';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
  userMenu : any;
  user : any;

  @ViewChild(Nav) nav: Nav;

public counter=0;

  rootPage: any;

  
  constructor(public platform: Platform, public statusBar: StatusBar,public modalCtrl: ModalController, public splashScreen: SplashScreen,private iab: InAppBrowser,public toastCtrl: ToastController,private oneSignal: OneSignal) {
    this.initializeApp();
    (window as any).handleOpenURL = (url: string) => {
      console.log(url)
      if(url == "logbookapps://activityproject"){
        this.nav.setRoot(MrecordPage);
      }
      else if(url == "logbookapps://activityplan"){
        this.nav.setRoot(MactivityplanPage);
      }
      else if(url == "logbookapps://issu"){
        this.nav.setRoot(MisuPage);
      }
      else{console.log('not route')}
    };
  platform.registerBackButtonAction(() => {
  var stackSize = this.nav.length();
  if(stackSize <= 1){
    if (this.counter==0) {
      this.counter++;
      this.presentToast();
      setTimeout(()=>{this.counter=0},3000);
    }else{ 
      platform.exitApp();
    } 
  }else{
    this.nav.pop();  
  }
});

  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Press again to exit.',
      duration: 2500
    });
    toast.present();
  }

  
  initializeApp() {
    
    this.platform.ready().then(() => {
    
      
     
      //cek storage
      if(localStorage.getItem('userData')==null) {
        this.rootPage = LoginPage;        
      }else{
        const data = JSON.parse(localStorage.getItem('userData'));
        this.userMenu = data.userData.id;
        this.user = data.userData.name;
        this.rootPage = HomePage; 

        this.oneSignal.startInit('0b79031f-a7c5-49df-beca-2b74b832b72b', '427231082658');

        if(data.userData.project_to_pm == null || data.userData.project_to_pm == '' || data.userData.project_to_pm == ""){
          this.oneSignal.sendTag('role_push','0')
        }
        else{
          this.oneSignal.sendTag('role_push',data.userData.project_to_pm)
        }
       
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  
        this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        });
  
        this.oneSignal.handleNotificationOpened().subscribe((data) => {
          // do something when a notification is opened
       
         if(data.notification.payload.additionalData.type == "isu"){
          this.nav.setRoot(MisuPage);
         }
         else if(data.notification.payload.additionalData.type == "chat"){

          const options: InAppBrowserOptions = {
            location : 'yes',
            hidden : 'no',
            zoom: 'no',
            hideurlbar:'yes'
          }
          // Opening a URL and returning an InAppBrowserObject
          const browser = this.iab.create('https://pm.inka.co.id/c/index.php?b068931cc450442b63f5b3d276ea4297='+this.user+'&d5d3db1765287eef77d7927cc956f50a='+data.notification.payload.additionalData.judul+'&h78hdb176528788877d7927cc95gg670='+data.notification.payload.additionalData.project,'_self',options);
          browser.show();
         }
         else if(data.notification.payload.additionalData.type == "activityproject")
         {
          this.nav.setRoot(MrecordPage);
         }
         else if(data.notification.payload.additionalData.type == "activityprojectplan"){
          this.nav.setRoot(MactivityplanPage);
         }
         else{
           console.log('not route')
         }


        });
        this.oneSignal.endInit();
      }
        
      this.statusBar.styleDefault();
      
      this.splashScreen.hide();

    
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  homePage() {
		this.nav.setRoot(HomePage);
  }
  logoutapp(){
    let modal = this.modalCtrl.create(LogoutPage);
		modal.present();
  }
  mprojectPage(){
    this.nav.setRoot(MprojectPage);
}

mrecordPage(){
  this.nav.setRoot(MrecordPage);
}
muserPage(){
  this.nav.setRoot(MuserPage);
}
mactivityplanPage(){
  this.nav.setRoot(MactivityplanPage);
}

misuPage(){
  this.nav.setRoot(MisuPage);
}
reportPage(){
  this.nav.push(ReportUtamaPage);
  
}
helpPage(){
  this.nav.setRoot(HelpPage);
}

}
