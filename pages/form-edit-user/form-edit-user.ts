import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';

/**
 * Generated class for the FormEditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-edit-user',
  templateUrl: 'form-edit-user.html',
})
export class FormEditUserPage {
  
  public FormEditData:FormGroup;
  responseEditDataProject:any;
  GetIdproject:any;
  postDataProject:any;
  Data_Project:any;
  postDataProjectd:any;
  Data_Projectd:any;
  selectedMaschine: string = ""; 
  selectedMaschine2: string = "";
  selectedMaschine3: string = "";
  itemskeproyekan:any;
  selectedvalue: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder, 
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController) {
    this.selectedMaschine = navParams.get('selectedMaschine');
    this.selectedMaschine2 = navParams.get('selectedMaschine2');
    this.selectedMaschine3 = navParams.get('selectedMaschine3');
      this.FormEditData=this.formBuilder.group({
        id_user:[''],
        maschine:[''],
        nama:['',Validators.required],
        nip:['',Validators.required],
        password:[''],
        jabatan:[''],
        jeniskelamin:['',Validators.required],
        roleuser:['',Validators.required],
      });
      

  }

  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    let id = this.navParams.get('iduser');
    this.GetIdproject={id_user:id};    
    this.authService.postData(this.GetIdproject,'Get_User_Edit').then((result) => {
      this.postDataProject = result;      
      if(this.postDataProject.Get_User_Edit){
        this.Data_Project=this.postDataProject.Get_User_Edit;
        if(this.postDataProject.Get_User_Edit[0].project_to_pm == '')
        {
          this.selectedMaschine="0";
        }
        else
        {
          this.selectedMaschine=this.postDataProject.Get_User_Edit[0].project_to_pm;
        }

        if(this.postDataProject.Get_User_Edit[0].project_to_pm == '')
        {
          this.itemskeproyekan = [
            {title: 'Admin',id: '001'},
            {title: 'Management',id: '002'},
            {title: 'Staff Keproyekan',id: '005'}
          ];
        }
        else
        {
          this.itemskeproyekan = [
            {title: 'Project Manager',id: '003'},
            {title: 'Staff Project Manager',id: '004'}
          ];
        }
       

        this.selectedvalue=this.postDataProject.Get_User_Edit[0].project_to_pm;
        this.selectedMaschine2=this.postDataProject.Get_User_Edit[0].gender;
        this.selectedMaschine3=this.postDataProject.Get_User_Edit[0].role_user;
        console.log(this.selectedvalue);
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
    this.getproject()

    
  }

  getproject(){
    this.authService.GetData('Data_Project').then((result) => {
      this.postDataProjectd = result;      
      if(this.postDataProjectd.Data_Project){
        this.Data_Projectd=this.postDataProjectd.Data_Project;
      
      }
      else{ 
        this.Data_Projectd='';
        
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    
    });
  }
  simpan(){
    console.log(this.FormEditData.value);
    this.common.presentLoading();
    this.authService.postData(this.FormEditData.value,'Edit_User').then((result) => {
      this.responseEditDataProject = result;      
      if(this.responseEditDataProject.Edit_User=="Edit success"){
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

  onChange($event){
    console.log($event)
    if($event == 0 || $event == '0')
    {
      this.itemskeproyekan = [
        {title: 'Admin',id: '001'},
        {title: 'Management',id: '002'},
        {title: 'Staff Keproyekan',id: '005'}
      ];
    }
    else
    {
      this.itemskeproyekan = [
        {title: 'Project Manager',id: '003'},
        {title: 'Staff Project Manager',id: '004'}
      ];
    }
    
  }

}
