import { Component } from'@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';

/**
 * Generated class for the FormEditRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-edit-record',
  templateUrl: 'form-edit-record.html',
})
export class FormEditRecordPage {
  
  public FormEditData:FormGroup;
  responseEditDataRecord:any;
  GetIdrecord:any;
  postDataRecord:any;
  postDataKategori:any;
  Data_Record:any;
  Data_Kategori:any;
  postDataProject:any;
  Data_Project:any;
  selectedMaschine: string = "";
  selectedMaschine2: string = "";
  tglawal: string = "";
  tglakhir: string = "";
  userDetails:any;
  pm:any;
  GetIdproject:any;
  postDataProject2:any;
  Data_Project2:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder,  
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController) {

      const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
        this.pm = data.userData.project_to_pm;
      }else{
        this.userDetails="";
      }
      this.selectedMaschine = navParams.get('selectedMaschine');
      this.selectedMaschine2 = navParams.get('selectedMaschine2');
      this.FormEditData=this.formBuilder.group({
        id_record:[''],
        maschine:['' , Validators.required],
        kategori:['', Validators.required],
        kegiatan:['', Validators.required],
        pembahasan:['', Validators.required],
        tindaklanjut:['', Validators.required],
        target:[''],
        tglstart:['', Validators.required],
        tglakhir:['', Validators.required],

      });
  }

  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    let id = this.navParams.get('idrecord');
    this.GetIdrecord={id_record:id};    
    this.authService.postData(this.GetIdrecord,'Get_Record_Edit').then((result) => {
      this.postDataRecord = result;      
      if(this.postDataRecord.Get_Record_Edit){
        this.Data_Record=this.postDataRecord.Get_Record_Edit;
        this.tglawal=this.postDataRecord.Get_Record_Edit[0].start_date;
        this.tglakhir=this.postDataRecord.Get_Record_Edit[0].end_date;
        this.selectedMaschine2=this.postDataRecord.Get_Record_Edit[0].category_id;
        this.selectedMaschine=this.postDataRecord.Get_Record_Edit[0].project_id;
        console.log(this.Data_Record);
        this.common.closeLoading();
      }
      else{ 
        this.Data_Record='';
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
    this.getProject()
    this.getproject_to_pm()
    this.getkategori()
  }
  getkategori(){
    this.authService.GetData('Data_Kategori').then((result) => {
      this.postDataKategori = result;      
      if(this.postDataKategori.Data_Kategori){
        this.Data_Kategori=this.postDataKategori.Data_Kategori;

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

  getProject(){
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
    console.log(this.FormEditData.value);
    this.common.presentLoading();
    this.authService.postData(this.FormEditData.value,'Edit_Record').then((result) => {
      this.responseEditDataRecord = result;      
      if(this.responseEditDataRecord.Edit_Record=="Edit success"){
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
