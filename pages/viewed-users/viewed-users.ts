import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';


/**
 * Generated class for the ViewedUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewed-users',
  templateUrl: 'viewed-users.html',
})
export class ViewedUsersPage {
  paramPushView:any;
  postDataView:any;
  Data_View:any;
  menu_param:any;
  db_id_param:any;


  constructor(public navCtrl: NavController,  public toastCtrl: ToastController, public navParams: NavParams,public viewCtrl: ViewController,public authService:AuthServiceProvider,) {
  }

  ionViewWillEnter() {
    this.menu_param = this.navParams.get('menu');
    this.db_id_param = this.navParams.get('db_id');
    this.paramPushView={menu:this.menu_param,db_id:this.db_id_param}; 
    this.authService.postData(this.paramPushView,'Data_View').then((result) => {
      this.postDataView = result;      
        this.Data_View=this.postDataView.Data_View;
        console.log(this.Data_View)
       
    
          
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    }); 
  }

  dismiss() {
		this.viewCtrl.dismiss();
  }

}
