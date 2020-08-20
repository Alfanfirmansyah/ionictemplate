import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  userDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    if(data.userData){
      this.userDetails = data.userData;
    }else{
      this.userDetails="";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }
  dismiss() {
		this.viewCtrl.dismiss();
  }

  logout(){
    localStorage.clear();
    setTimeout(() => window.location.reload(), 1000);
  }
  

}
