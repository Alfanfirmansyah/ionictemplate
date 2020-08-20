/*
  Import Library component page Ionic
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertController } from'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { FormInputUserPage } from '../form-input-user/form-input-user';
import { FormEditUserPage } from '../form-edit-user/form-edit-user';

/*
 * Memamnggil view manage page
*/
@IonicPage()
@Component({
  selector: 'page-muser',
  templateUrl: 'muser.html',
})
/**
 * Generated class for the MuserPage page.
 *
 *
 * Ionic pages and navigation.
 */

export class MuserPage {
  postDataProject:any;
  Data_Project:any;
  iduserDelete:any;
  postDelete:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  }

  /*
  * Memamnggil data api untuk menampilkan data
  */
  ionViewWillEnter() {
    this.authService.GetData('Data_User').then((result) => {
      this.postDataProject = result;      
      if(this.postDataProject.Data_User){
        this.Data_Project=this.postDataProject.Data_User;
      
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
  pageInput(){
    this.navCtrl.push(FormInputUserPage);
  }

  /*
  * Fungsi hapus data user dari 
  */
  Hapus(iduser){
    this.iduserDelete={id_user:iduser};
    this.authService.postData(this.iduserDelete,'Delete_User').then((result) => {
      this.postDelete = result;      
      if(this.postDelete.Delete_User){
          this.authService.GetData('Data_User').then((result) => {
            this.postDataProject = result;      
            if(this.postDataProject.Data_User){
              this.Data_Project=this.postDataProject.Data_User;
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
  showConfirm(iduser) {
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
            this.Hapus(iduser);
          }
        }
      ]
    });
    confirm.present();
  }

  /*
  * Fungsi menampilkan edit page user 
  */
  pageEdit(iduser){
    this.navCtrl.push(FormEditUserPage,{
      iduser: iduser
    });
  }

}
