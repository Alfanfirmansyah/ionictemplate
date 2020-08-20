import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';

/**
 * Generated class for the FormInputUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-input-user',
  templateUrl: 'form-input-user.html',
})
export class FormInputUserPage {
  responseInputDataRecord:any;
  postDataProject:any;
  Data_Project:any;
  public FormSimpanData:FormGroup;
  selectedMaschine: string = "";
  selectedMaschine2: string = "";
  selectedMaschine3: string = "";
  itemskeproyekan:any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,
    public common : CommonProvider, public toastCtrl: ToastController,private formBuilder:FormBuilder) {
      this.selectedMaschine = navParams.get('selectedMaschine');
      this.selectedMaschine2 = navParams.get('selectedMaschine2');
      this.selectedMaschine3 = navParams.get('selectedMaschine3');
      
      this.FormSimpanData=this.formBuilder.group({
        maschine:['',],
        nama:['',Validators.required],
        nip:['',Validators.required],
        password:['',Validators.required],
        jabatan:[''],
        jeniskelamin:['',Validators.required],
        roleuser:['',Validators.required],

      });
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
  simpan(){
    this.authService.postData(this.FormSimpanData.value,'Input_User').then((result) => {
      this.responseInputDataRecord = result;      
      if(this.responseInputDataRecord.Input_User=="input success"){
        const toast = this.toastCtrl.create({
          message: 'Data berhasil disimpan.',
          duration: 2500
        });
        toast.present();
       
        this.navCtrl.pop();
      }
      else if(this.responseInputDataRecord.Input_User=="data sudah ada"){
        const toast = this.toastCtrl.create({
          message: 'Data Sudah Ada.',
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
