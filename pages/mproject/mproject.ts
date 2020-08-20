import { Component } from'@angular/core';
import { NavController, NavParams, ToastController } from'ionic-angular';
import { AlertController } from'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { FormInputProjectPage } from '../form-input-project/form-input-project';
import { FormEditProjectPage } from '../form-edit-project/form-edit-project';

@Component({
  selector: 'page-mproject',
  templateUrl: 'mproject.html',
})
export class MprojectPage {
  postDataProject:any;
  Data_Project:any;
  idprojectDelete:any;
  postDelete:any;
  userDetails:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
      const data = JSON.parse(localStorage.getItem('userData'));
    if(data.userData){
      this.userDetails = data.userData;
    }else{
      this.userDetails="";
    }
  }
  ionViewWillEnter() {
    this.authService.GetData('Data_Project').then((result) => {
      this.postDataProject = result;      
      if(this.postDataProject.Data_Project){
        this.Data_Project=this.postDataProject.Data_Project;
      
      }
      else{ 
        this.Data_Project='';
        
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    
    });
  }
  Hapus(idproject){
    this.idprojectDelete={id_project:idproject};
   
    this.authService.postData(this.idprojectDelete,'Delete_Project').then((result) => {
      this.postDelete = result;      
      if(this.postDelete.Delete_Project){
          this.authService.GetData('Data_Project').then((result) => {
            this.postDataProject = result;      
            if(this.postDataProject.Data_Project){
              this.Data_Project=this.postDataProject.Data_Project;
              const toast = this.toastCtrl.create({
                message: 'Data berhasil dihapus.',
                duration: 2500
              });
              toast.present();
            }
            else{ 
              this.Data_Project='';
          }     
          }, (err) => {
          });
       
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
  showConfirm(idproject) {
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
            this.Hapus(idproject);
          }
        }
      ]
    });
    confirm.present();
  }
  pageInput(){
    this.navCtrl.push(FormInputProjectPage);
  }
  pageEdit(idproject){
    this.navCtrl.push(FormEditProjectPage,{
      idproject: idproject
    });
  }
  
}