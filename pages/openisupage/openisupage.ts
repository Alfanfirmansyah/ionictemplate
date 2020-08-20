import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { FormInputIsuPage } from '../form-input-isu/form-input-isu';
import { FormEditIsuPage } from '../form-edit-isu/form-edit-isu';
import { DetailIsuPage } from '../detail-isu/detail-isu';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';



/**
 * Generated class for the OpenisupagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-openisupage',
  templateUrl: 'openisupage.html',
})
export class OpenisupagePage {
  postDataPlan:any;
  Data_Plan:any;
  idprojectDelete:any;
  postDelete:any;
  status='open';
  GetIdplan:any;
  userDetails
  pm:any;
  user:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,
    public common : CommonProvider,public toastCtrl: ToastController,public actionSheetCtrl: ActionSheetController
    ,private iab: InAppBrowser,public alertCtrl: AlertController
    ) {

      const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
        this.pm = data.userData.project_to_pm;
        this.user = data.userData.name;
      }else{
        this.userDetails="";
      }
  }
  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    this.GetIdplan={pm:this.pm,status:this.status};    
    this.authService.postData(this.GetIdplan,'Data_Isu').then((result) => {
      this.postDataPlan = result;      
      if(this.postDataPlan.Data_Isu){
        this.Data_Plan=this.postDataPlan.Data_Isu;
        this.common.closeLoading();
      }
      else{ 
        this.Data_Plan='';
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

  pageInput(){
    this.navCtrl.push(FormInputIsuPage);
  }

  presentActionSheet(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opsi Isu',
      buttons: [
        {
          text: 'Lihat Detail Isu',
          handler: () => {
            this.showConfirmclose(id)
           
          }
        },
        
        {
          text: 'Edit Isu',
          handler: () => {
            this.edit(id)
           
            
          }
        }, 
        {
          text: 'Delete Isu',
          handler: () => {
           this.showConfirm(id)
            
          }
        },        
        {
          text: 'Batal',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  
  }

  presentActionSheetview(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opsi Isu',
      buttons: [
        {
          text: 'Lihat Detail Isu',
          handler: () => {
            this.showConfirmclose(id)
           
          }
        },
        {
          text: 'Batal',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  
  }

  edit(id){
    this.navCtrl.push(FormEditIsuPage,{
      idisu: id

  });

}
showConfirm(idproject) {
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
          this.Hapus(idproject);
        }
      }
    ]
  });
  confirm.present();
}
showConfirmclose(idproject) {

  this.navCtrl.push(DetailIsuPage,{
    idisu: idproject

});
  
}
comment(id){
  this.navCtrl.push(DetailIsuPage,{
    idisu: id

});

}

disqus(title,user){
  const options: InAppBrowserOptions = {
    location : 'yes',
    hidden : 'no',
    zoom: 'no',
    hideurlbar:'yes'
  }
  // Opening a URL and returning an InAppBrowserObject
  const browser = this.iab.create('https://apilog.gardabhaktikarya.com/logbookapp/chat/index.php?b068931cc450442b63f5b3d276ea4297='+user+'&d5d3db1765287eef77d7927cc956f50a='+title+'&h78hdb176528788877d7927cc95gg670='+this.pm,'_self',options);
  browser.show();
}
Hapus(idisu){
  this.idprojectDelete={id_isu:idisu};
  this.authService.postData(this.idprojectDelete,'Delete_Isu').then((result) => {
    this.postDelete = result;      
    if(this.postDelete.Delete_Isu){
       this.ionViewWillEnter()
       const toast = this.toastCtrl.create({
        message: 'Data berhasil dihapus.',
        duration: 2500
      });
      toast.present();
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
 doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


}
