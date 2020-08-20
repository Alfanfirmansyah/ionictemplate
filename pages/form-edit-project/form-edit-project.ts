import { Component } from'@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from'ionic-angular';
import { FormBuilder,FormGroup } from'@angular/forms';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';

/**
 * Generated class for the FormEditProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-edit-project',
  templateUrl: 'form-edit-project.html',
})
export class FormEditProjectPage {
  public FormEditData:FormGroup;
  responseEditDataProject:any;
  GetIdproject:any;
  postDataProject:any;
  Data_Project:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder, 
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController) {
      this.FormEditData=this.formBuilder.group({
        id_project:[''],
        nama_project:['']
      });
  }
  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    let id = this.navParams.get('idproject');
    this.GetIdproject={id_project:id};    
    this.authService.postData(this.GetIdproject,'Get_Project_Edit').then((result) => {
      this.postDataProject = result;      
      if(this.postDataProject.Get_Project_Edit){
        this.Data_Project=this.postDataProject.Get_Project_Edit;
        console.log(this.Data_Project);
        this.common.closeLoading();
      }
      else{ 
        this.Data_Project='';
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
  simpan(){
    console.log(this.FormEditData.value);
    this.common.presentLoading();
    this.authService.postData(this.FormEditData.value,'Edit_Project').then((result) => {
      this.responseEditDataProject = result;      
      if(this.responseEditDataProject.Edit_Project=="Edit success"){
        const toast = this.toastCtrl.create({
          message: 'Data berhasil diubah.',
          duration: 2500
        });
        toast.present();
        this.common.closeLoading();
        this.navCtrl.pop();
      }
      else{ 
        const toast = this.toastCtrl.create({
          message: 'Data gagal diubah.',
          duration: 2500
        });
        toast.present();
        this.common.closeLoading();
     }    
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: 'Gagal koneksi ke server.',
        duration: 2500
      });
      toast.present();
      this.common.closeLoading();
    });
  }
}
