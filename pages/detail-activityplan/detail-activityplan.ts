import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { FormEditPlanPage } from '../form-edit-plan/form-edit-plan';

/**
 * Generated class for the DetailActivityplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-activityplan',
  templateUrl: 'detail-activityplan.html',
})
export class DetailActivityplanPage {
  GetIdplan:any;
  postDataPlan:any;
  Data_Plan:any;
  postDelete:any;
  idattachmentDelete:any;
  idrecordDelete:any;
  status='rencana';
  idprojectDelete:any;
  datao = 'on progress';
  datat = 'terealisasi';
  userDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController) {
      const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
      }else{
        this.userDetails="";
      }
      
  }

  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    let id = this.navParams.get('idplan');
    this.GetIdplan={id_plan:id};    
    this.authService.postData(this.GetIdplan,'Get_Plan_Detail').then((result) => {
      this.postDataPlan = result;      
      if(this.postDataPlan.Get_Plan_Detail){
        this.Data_Plan=this.postDataPlan.Get_Plan_Detail;
        console.log(this.Data_Plan);
        this.common.closeLoading();
      }
      else{ 
        this.Data_Plan='';
        this.common.closeLoading();
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    this.common.closeLoading();
    });    

  }
  editdata(idplan){
    this.navCtrl.push(FormEditPlanPage,{
      idplan: idplan
    });
  }

  delete(idproject) {
    const confirm = this.alertCtrl.create({
      message: 'Apakah anda yakin akan menghapus data ini?',     
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.hapus(idproject);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
  hapus(idproject){
    this.idrecordDelete={id_plan:idproject};
    this.authService.postData(this.idrecordDelete,'Delete_Plan').then((result) => {
      this.postDelete = result;  
      const toast = this.toastCtrl.create({
        message: 'Data berhasil dihapus.',
        duration: 2500
      });
      toast.present();         
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    
   
    });
  }
  presentActionSheet(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilih Opsi',
      buttons: [
        {
          text: 'Ubah Status On Progress',
          handler: () => {
            
            this.confirm(id,this.datao)
           
          }
        },
        {
          text: 'Ubah Status Terealisasi',
          handler: () => {
            
            this.confirm(id,this.datat)
           
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
  presentActionSheetonprogress(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilih Opsi',
      buttons: [
        {
          text: 'Ubah Status Terealisasi',
          handler: () => {
            
            this.confirm(id,this.datat)
           
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
  presentActionSheetterealisasi(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilih Opsi',
      buttons: [
        {
          text: 'Ubah Status On Progress',
          handler: () => {
            
            this.confirm(id,this.datao)
           
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
  confirm(id,data) {
    const confirm = this.alertCtrl.create({
      message: 'Apakah anda yakin ingin mengganti status activity plan?',     
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.changestatus(id,data);
          }
        }
      ]
    });
    confirm.present();
  }
  
  changestatus(id,data){
    this.idprojectDelete={id_plan:id,datastatus:data};
    this.authService.postData(this.idprojectDelete,'Change_Status_Plan').then((result) => {
      this.postDelete = result;      
      if(this.postDelete.Change_Status_Plan){
        
        this.navCtrl.pop();
      }
      else{ 
       
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
   
    });
  
  }


}


