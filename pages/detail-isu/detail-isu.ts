import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the DetailIsuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-isu',
  templateUrl: 'detail-isu.html',
})
export class DetailIsuPage {

  public FormEditData:FormGroup;
  responseEditDataRecord:any;
  GetIdrecord:any;
  postDataRecord:any;
  Data_Record:any;
  postDataProject:any;
  Data_Project:any;
  selectedMaschine: string = "";       
  selectedMaschine2: string = "";
  userDetails:any;
  pm:any;
  GetIdproject:any;
  postDataProject2:any;
  Data_Project2:any;
  user:any;
  user_id:any;
  idprojectDelete:any;
  postDelete:any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder,  
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController,
    private iab: InAppBrowser,

    ) {
      const data = JSON.parse(localStorage.getItem('userData'));
    if(data.userData){
      this.userDetails = data.userData;
      this.pm = data.userData.project_to_pm;
      this.user = data.userData.name;
      this.user_id = data.userData.id;
    }else{
      this.userDetails="";
    }
      this.selectedMaschine = navParams.get('selectedMaschine');
      this.selectedMaschine2 = navParams.get('selectedMaschine2');
      this.FormEditData=this.formBuilder.group({
        pic:['', Validators.required],
        keterangan:['', Validators.required],
        isuid:['', Validators.required],
  
  
       
  
      });
  }


  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    let id = this.navParams.get('idisu');
    this.GetIdrecord={id_isu:id};    
    this.authService.postData(this.GetIdrecord,'Get_Record_Isu').then((result) => {
      this.postDataRecord = result;      
      if(this.postDataRecord.Get_Record_Isu){
        this.Data_Record=this.postDataRecord.Get_Record_Isu;
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
  }

  disqus(name,projectid){
    const options: InAppBrowserOptions = {
      location : 'yes',
      hidden : 'no',
      zoom: 'no',
      hideurlbar:'yes'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.iab.create('https://pm.inka.co.id/c/index.php?b068931cc450442b63f5b3d276ea4297='+this.user+'&d5d3db1765287eef77d7927cc956f50a='+name+'&h78hdb176528788877d7927cc95gg670='+projectid,'_self',options);
    browser.show();
  }

  CloseIsu(){
    this.authService.postData(this.FormEditData.value,'Close_Isu').then((result) => {
      this.postDelete = result;      
      if(this.postDelete.Close_Isu){
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
