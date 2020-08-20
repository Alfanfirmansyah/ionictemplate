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
 * Generated class for the ReportActivityprojectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-report-activityprojects',
  templateUrl: 'report-activityprojects.html',
})
export class ReportActivityprojectsPage {

  postDataProject:any;
  Data_Project:any;
  postDataKategori:any;
  Data_Kategori:any;
  userDetails : any;
  kategori:any;
  project:any;
  pm:any;
  public FormCetakData:FormGroup;
  constructor(public navCtrl: NavController,public common : CommonProvider,  public loadingCtrl: LoadingController,  public alertCtrl: AlertController, public navParams: NavParams, public authService:AuthServiceProvider,public toastCtrl: ToastController, private formBuilder:FormBuilder, private fileOpener: FileOpener,
    private file: File,
    private transfer: FileTransfer,
    private androidPermissions: AndroidPermissions) {
  const data = JSON.parse(localStorage.getItem('userData'));

    this.FormCetakData=this.formBuilder.group({
      project:['', Validators.required],
      kategori:['', Validators.required],
    });

    if(data.userData){
      this.userDetails = data.userData;
      this.pm = data.userData.project_to_pm;
    }else{
      this.userDetails="";
    }
    this.dataproject();
    this.datakategori();
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

  datakategori(){
    
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

  cetak(){
    const loader = this.loadingCtrl.create({content: "Please wait..."});
    loader.present();

    if(this.FormCetakData.value.kategori == 0){
      this.kategori = "";

    }
    else{
      this.kategori = this.FormCetakData.value.kategori;
    }

    if(this.FormCetakData.value.project == 0){
      this.project = "";

    }
    else{
      this.project = this.FormCetakData.value.project;
    }


    const url = 'https://pm.inka.co.id/a/reportpdf/activityproject.php?project='+this.project+'&kategori='+this.kategori;
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
