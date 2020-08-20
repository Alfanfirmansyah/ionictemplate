/*
  Import Library component Ionic angular js
*/
import { Component } from'@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { HomePage } from'../../pages/home/home';

/*
  Memamnggil view login page
*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

  /*
    Login page class
  */
export class LoginPage {

  /*
    Define user data login
  */
  private FormLogin:FormGroup;
  responseData : any;
  userData = {"username": "","password": "", "nama": ""};
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder, 
    public authService:AuthServiceProvider, public toastCtrl: ToastController,public alerCtrl: AlertController) {
      this.FormLogin=this.formBuilder.group({
        nip:['', Validators.required],
        password:['', Validators.required]
      });
  }

  /*
    Process user login, call response
  */
  login(){
    this.authService.postData(this.FormLogin.value,'login').then((result) => {
     this.responseData = result;
     if(this.responseData.userData){
     localStorage.setItem('userData', JSON.stringify(this.responseData));
     this.navCtrl.setRoot(HomePage);
     window.location.reload();  
     }
     else{ 
        const toast = this.toastCtrl.create({
          message: 'NIP dan kata sandi yang Anda masukkan tidak cocok. Silakan periksa dan coba lagi.',
          duration: 3000
        });
        toast.present();
    }
   }, (err) => {
    const toast = this.toastCtrl.create({
      message: err,
      duration: 10000
    });
    console.log(err)
    toast.present();
   });
 }
 forgotPass(){
  let alert = this.alerCtrl.create({
    title: 'Lupa Password',
    message: 'Silahkan hubungi admin untuk mengetahui lupa password!',
    buttons: ['Ok']
  });
  alert.present()
}
 }
