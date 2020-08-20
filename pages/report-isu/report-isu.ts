import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, AlertController, LoadingController } from'ionic-angular';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from'@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the ReportIsuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-report-isu',
  templateUrl: 'report-isu.html',
})
export class ReportIsuPage {

  postDataProject:any;
  Data_Project:any;
  project:any;
  userDetails : any;
  pm:any;
  public FormCetakData:FormGroup;
  constructor(public navCtrl: NavController,public common : CommonProvider,  public loadingCtrl: LoadingController,  public alertCtrl: AlertController, public navParams: NavParams, public authService:AuthServiceProvider,public toastCtrl: ToastController, private formBuilder:FormBuilder, private fileOpener: FileOpener,
    private file: File,
    private transfer: FileTransfer,
    private androidPermissions: AndroidPermissions) {
  const data = JSON.parse(localStorage.getItem('userData'));

    this.FormCetakData=this.formBuilder.group({
      project:['', Validators.required],
      status:['', Validators.required],
    });

    if(data.userData){
      this.userDetails = data.userData;
      this.pm = data.userData.project_to_pm;
    }else{
      this.userDetails="";
    }
    this.dataproject();
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

  cetak(){
    const loader = this.loadingCtrl.create({content: "Please wait..."});
    loader.present();


    if(this.FormCetakData.value.project == 0){
      this.project = "";

    }
    else{
      this.project = this.FormCetakData.value.project;
    }

    const url = 'https://pm.inka.co.id/a/reportpdf/isu.php?project='+this.project+'&status='+this.FormCetakData.value.status;
    const fileTransfer: FileTransferObject = this.transfer.create();
     fileTransfer.download(url, this.file.externalRootDirectory + 'Download/dompdf_out.pdf').then((entry) => {     
       
       const confirm = this.alertCtrl.create({
         title: 'Informasi',
         message: 'File dokumen berhasil di unduh.<br>'+entry.toURL(),
         buttons: [
           {
             text: 'Tutup',
             handler: () => {
              // console.log('Disagree clicked');
             }
           },
           {
             text: 'Buka',
             handler: () => {
               this.fileOpener.open(this.file.externalRootDirectory + 'Download/dompdf_out.pdf', 'application/pdf')
                   .then(() => console.log('File is opened'))
                   .catch(e => console.log('Error opening file', e));
             }
           }
         ]
       });
       confirm.present();
       loader.dismiss();

     }, (error) => {
       console.log(error);
       const alert = this.alertCtrl.create({
         title: 'Informasi',
         subTitle: 'File dokumen gagal di unduh.',
         buttons: ['OK']
       });
       alert.present();
       loader.dismiss();
     });
  }

}
