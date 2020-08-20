import { Component } from'@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';

/**
 * Generated class for the FormInputProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-input-project',
  templateUrl: 'form-input-project.html',
})
export class FormInputProjectPage {

  public FormSimpanData:FormGroup;
  responseInputDataProject:any;
  userDetails : any;
  myDate: String = new Date().toISOString(); 
  cek:any;      
  cek2:any;                            

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder, 
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController) {
      this.FormSimpanData=this.formBuilder.group({
        nama_project:['', Validators.required]
      });

      const data = JSON.parse(localStorage.getItem('userData'));
    if(data.userData){
      this.userDetails = data.userData;
    }else{
      this.userDetails="";
    }
  }

  simpan(){
    
    this.authService.postData(this.FormSimpanData.value,'Input_Project').then((result) => {
      this.responseInputDataProject = result;      
      if(this.responseInputDataProject.Input_Project=="input success"){
        const toast = this.toastCtrl.create({
          message: 'Data berhasil disimpan.',
          duration: 2500
        });
        toast.present();
        this.navCtrl.pop();
      }
      else{ 
        const toast = this.toastCtrl.create({
          message: 'Data gagal disimpan.',
          duration: 2500
        });
        toast.present();
        
     }    
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: 'Gagal koneksi ke server.',
        duration: 2500
      });
      toast.present();
     
    });
  }
}


