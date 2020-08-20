import { Component } from'@angular/core';
import { NavController, NavParams, ModalController,ToastController } from'ionic-angular';
import { AlertController } from'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { FormInputRecordPage } from '../form-input-record/form-input-record';
import { DetailRecordPage } from '../detail-record/detail-record';
import { FormBuilder,Validators,FormGroup } from'@angular/forms';
import { ViewedUsersPage } from '../viewed-users/viewed-users';

/**
 * Generated class for the MrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mrecord',
  templateUrl: 'mrecord.html',
})
export class MrecordPage {
  public FormSearch:FormGroup;
  postDataRecord:any;
  Data_Record:any;
  postDataView:any;
  Data_View:any;
  postDataProject:any;
  Data_Project:any;
  postDataKategori:any;
  Data_Kategori:any;
  projectd: string = "";
  kategorid: string = "";
  Getparam:any;
  GetparamRead:any;
  paramPushView:any;
  coba:any;
  public FormSimpanData:FormGroup;
  coba2:any;
  pm:any;
  user_id:any;
  userDetails:any;
  slice: number = 5;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    private formBuilder:FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
    ) {

      

      const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
        this.pm = data.userData.project_to_pm;
        this.user_id = data.userData.id;
      }else{
        this.userDetails="";
      }

      this.FormSimpanData=this.formBuilder.group({
        user_id:data.userData.id,
        db_id:['', Validators.required],
        menu:1,
      });
      
      this.FormSearch=this.formBuilder.group({
        project:[''],
        kategori:['']
      });
      
      this.projectd = navParams.get('projectd');
      this.kategorid = navParams.get('kategorid');

      this.dataproject();
      this.getrecord();
      this.getkategori();
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

  getrecord(){
    this.common.presentLoading();
    this.GetparamRead={pm:this.pm};    
    this.authService.postData(this.GetparamRead,'Data_Record').then((result) => {
      this.postDataRecord = result;      
      if(this.postDataRecord.Data_Record){
        this.Data_Record=this.postDataRecord.Data_Record;
        console.log(this.Data_Record)
        this.common.closeLoading();
       
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

  dataproject(){
    
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

  search(){
    this.common.presentLoading();
    this.coba = this.FormSearch.value.project
    this.coba2 = this.FormSearch.value.kategori
    this.Getparam={projectparam:this.coba,kategoriparam:this.coba2,pm:this.pm};    
    this.authService.postData(this.Getparam,'Data_RecordFilter').then((result) => {
      this.postDataRecord = result;      
      if(this.postDataRecord.Data_RecordFilter){
        this.Data_Record=this.postDataRecord.Data_RecordFilter;
        console.log(this.Data_Record);
        this.common.closeLoading();
      }
      else{ 
        const toast = this.toastCtrl.create({
          message: 'Data Tidak Ada.',
          duration: 2500
        });
        toast.present();
     }     
    }, (err) => {

    });    

  }

  reset(){
    this.projectd = '';
    this.kategorid = '';
    this.getrecord();
  }
  
  pageInput(){
    this.navCtrl.push(FormInputRecordPage);
  }

  pushView(db_id_param){
    this.paramPushView={user_id:this.user_id,db_id:db_id_param,menu:1}; 
    this.authService.postData(this.paramPushView,'Push_View')
  }

  pageDetail(idrecord){
    this.pushView(idrecord)
    this.navCtrl.push(DetailRecordPage,{
      idrecord: idrecord
    });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getrecord();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
     this.slice += 5;
     infiniteScroll.complete();
    }, 1000);
   }

viewuser(db_id_param){

  let modal = this.modalCtrl.create(ViewedUsersPage,{
    menu: 1,db_id:db_id_param});
	modal.present();
}
 

  
 
  
}
