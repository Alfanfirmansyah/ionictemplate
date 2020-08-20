import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommonProvider } from '../../providers/common/common';
import { DetailActivityplanPage } from '../detail-activityplan/detail-activityplan';
import { FormInputActivityplanPage } from '../form-input-activityplan/form-input-activityplan';
import { FormBuilder,FormGroup } from'@angular/forms';

/**
 * Generated class for the ArencanaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aterealisasi',
  templateUrl: 'aterealisasi.html',
})
export class AterealisasiPage {
  postDataPlan:any;
  Data_Plan:any;
  idprojectDelete:any;
  public FormSearch:FormGroup;
  postDataProject:any;
  Data_Project:any;
  postDelete:any;
  status='rencana';
  datao = 'on progress';
  datat = 'terealisasi';
  GetIdplan:any;
  Getpm:any;
  pic2: string = "";
  userDetails
  pm:any;

  Getparam:any;
  coba:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,
    public common : CommonProvider,public toastCtrl: ToastController,public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController, private formBuilder:FormBuilder
    ) {
      
      this.FormSearch=this.formBuilder.group({
        pic:['']
      });
    const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
        this.pm = data.userData.project_to_pm;
      }else{
        this.userDetails="";
      }
      
      this.pic2 = navParams.get('pic2');
      
      
  }

datarencana(){
  this.common.presentLoading();
    this.GetIdplan={pm:this.pm,status:this.datat};    
    this.authService.postData(this.GetIdplan,'Data_Rencana').then((result) => {
      this.postDataPlan = result;      
      if(this.postDataPlan.Data_Rencana){
        this.Data_Plan=this.postDataPlan.Data_Rencana;
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
  pageDetailplan(id){
    this.navCtrl.push(DetailActivityplanPage,{
      idplan: id

  });

}

pageInput(){
  this.navCtrl.push(FormInputActivityplanPage);

}

getpic(){
  this.Getpm={pm:this.pm};    
  this.authService.postData(this.Getpm,'Data_User_Pm').then((result) => {
    this.postDataProject = result;      
    if(this.postDataProject.Data_User_Pm){
      this.Data_Project=this.postDataProject.Data_User_Pm;
     
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
  this.coba = this.FormSearch.value.pic
  this.Getparam={pm:this.pm,status:this.datat,pic:this.coba};     
  this.authService.postData(this.Getparam,'Data_PlanFilter').then((result) => {
    this.postDataPlan = result;      
    if(this.postDataPlan.Data_PlanFilter){
      this.Data_Plan=this.postDataPlan.Data_PlanFilter;
      this.common.closeLoading();
    }
    else{ 
      const toast = this.toastCtrl.create({
        message: 'Data Tidak Ada',
        duration: 2500
      });
      toast.present();
     
   }     
  }, (err) => {

  });    

}

reset(){
  this.datarencana()
  this.pic2=''
}
doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.datarencana();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
ionViewWillEnter() {
this.getpic();
this.datarencana()
}
}
