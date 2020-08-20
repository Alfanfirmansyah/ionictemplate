import { Component } from'@angular/core';
import { NavController, NavParams, ToastController } from'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { AlertController } from'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';

/**
 * Generated class for the FormInputRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-form-input-record',
  templateUrl: 'form-input-record.html',
})
export class FormInputRecordPage {
  postDataProject:any;
  Data_Project:any;
  Data_Kategori:any;
  responseInputDataRecord:any;
  project:'';
  selectedMaschine: string = "";
  selectedMaschine2: string = "";
  userDetails : any;
  pm:any;

  GetIdproject:any;
  postDataProject2:any;
  Data_Project2:any;
  public FormSimpanData:FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    private formBuilder:FormBuilder, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
      this.selectedMaschine = navParams.get('selectedMaschine');
      this.selectedMaschine2 = navParams.get('selectedMaschine2');
      this.FormSimpanData=this.formBuilder.group({
        maschine:['', Validators.required],
        tglcreate:[''],
        kegiatan:['', Validators.required],
        kategori:['', Validators.required],
        pembahasan:['', Validators.required],
        tindaklanjut:['', Validators.required],
        target:[''],
        pic:[''],
        tglstart:['', Validators.required],
        tglakhir:['', Validators.required],

      });

      const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
        this.pm = data.userData.project_to_pm;
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
    this.getproject_to_pm();
    this.getkategori();
  }

  getkategori(){
    this.authService.GetData('Data_Kategori').then((result) => {
      this.postDataProject = result;      
      if(this.postDataProject.Data_Kategori){
        this.Data_Kategori=this.postDataProject.Data_Kategori;

      }
      else{ 
        this.Data_Kategori='';
      
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
   
    });
  }

  getproject_to_pm(){
    
    this.GetIdproject={id_project:this.pm};    
    this.authService.postData(this.GetIdproject,'Get_Project_PM').then((result) => {
      this.postDataProject2 = result;      
      if(this.postDataProject2.Get_Project_PM){
        this.Data_Project2=this.postDataProject2.Get_Project_PM;
        console.log(this.Data_Project2);

      }
      else{ 
        this.Data_Project2='';
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
    
    this.authService.postData(this.FormSimpanData.value,'Input_Record').then((result) => {
      this.responseInputDataRecord = result;      
      if(this.responseInputDataRecord.Input_Record=="input success"){
        this.authService.postData(this.FormSimpanData.value,'Push_Notif_Activityprojects')
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


