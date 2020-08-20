import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DetailIsuPage } from '../detail-isu/detail-isu';

/**
 * Generated class for the CloseisupagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-closeisupage',
  templateUrl: 'closeisupage.html',
})
export class CloseisupagePage {
  postDataPlan:any;
  Data_Plan:any;
  GetIdplan:any;
  status='close';
  userDetails
  pm:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,public toastCtrl: ToastController,public actionSheetCtrl: ActionSheetController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    if(data.userData){
      this.userDetails = data.userData;
      this.pm = data.userData.project_to_pm;
    }else{
      this.userDetails="";
    }
  }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.GetIdplan={pm:this.pm,status:this.status};    
    this.authService.postData(this.GetIdplan,'Data_Isu').then((result) => {
      this.postDataPlan = result;      
      if(this.postDataPlan.Data_Isu){
        this.Data_Plan=this.postDataPlan.Data_Isu;
      }
      else{ 
        this.Data_Plan='';
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    });    

  }

  presentActionSheetview(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opsi Isu',
      buttons: [
        {
          text: 'Lihat Detail Isu',
          handler: () => {
            this.showConfirmclose(id)
           
          }
        },
        {
          text: 'Batal',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  
  }
  showConfirmclose(idproject) {

    this.navCtrl.push(DetailIsuPage,{
      idisu: idproject
  
  });
    
  }

}
