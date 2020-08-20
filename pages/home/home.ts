import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { MrecordPage } from '../mrecord/mrecord';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DetailRecordPage } from '../detail-record/detail-record';
import { ViewedUsersPage } from '../viewed-users/viewed-users';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  postDataRecord:any;
  Data_Record:any;
  GetparamRead:any;
  userDetails : any;
  pm:any;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public authService:AuthServiceProvider,
    public toastCtrl: ToastController,
    ) {
    const data = JSON.parse(localStorage.getItem('userData'));
    if(data.userData){
      this.userDetails = data.userData;
      this.pm = data.userData.project_to_pm;
    }else{
      this.userDetails="";
    }
  }
  logout() {
    let modal = this.modalCtrl.create(LogoutPage);
		modal.present();
   
  }
  viewall(){
    this.navCtrl.push(MrecordPage);
  }

  ionViewWillEnter() {
    
    this.GetparamRead={pm:this.pm};    
    this.authService.postData(this.GetparamRead,'Data_HomeRecord').then((result) => {
      this.postDataRecord = result;      
      if(this.postDataRecord.Data_Record){
        this.Data_Record=this.postDataRecord.Data_Record;
       
      }
      else{ 
        const toast = this.toastCtrl.create({
          message: 'Data Tidak Ada.',
          duration: 2500
        });
        toast.present();
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    }); 

    
  }
  pageDetail(idrecord){
    this.navCtrl.push(DetailRecordPage,{
      idrecord: idrecord
    });
  }

  viewuser(db_id_param){

    let modal = this.modalCtrl.create(ViewedUsersPage,{
      menu: 1,db_id:db_id_param});
    modal.present();
  }

  }


