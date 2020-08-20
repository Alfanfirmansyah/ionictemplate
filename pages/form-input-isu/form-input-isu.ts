import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { AlertController } from'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { Camera, CameraOptions } from'@ionic-native/camera';
import { FilePath } from'@ionic-native/file-path';
import { File,FileEntry } from'@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from'@ionic-native/file-transfer';


/**
 * Generated class for the FormInputIsuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-input-isu',
  templateUrl: 'form-input-isu.html',
})
export class FormInputIsuPage {

  imageURI:any;
  fileURI:any;
  imageFileName:any;
  GetImageNameUpload:any;
  GetGaleriNameUpload:any;
  GaleriName:any;

  postDelete:any;
  idattachmentDelete:any;
  postDeleteAttachment:any;

  userDetails:any;
  pm:any;
  postDataProject:any;
  Data_Project:any;
  responseInputDataRecord:any;
  project:'';
  selectedMaschine: string = "";
  selectedMaschine2: string = "";
  isumessage: string = "";

  GetIdproject:any;
  postDataProject2:any;
  Data_Project2:any;
  public FormSimpanData:FormGroup;
  private fileTransfer: FileTransferObject;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    private formBuilder:FormBuilder, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private transfer: FileTransfer,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private fileChooser: FileChooser,
    public loadingCtrl: LoadingController,
    
    ) {
    
      this.selectedMaschine = navParams.get('selectedMaschine');
      this.selectedMaschine2 = navParams.get('selectedMaschine2');
    this.FormSimpanData=this.formBuilder.group({
      maschine:['', Validators.required],
      isu:['', Validators.required],
      kategori:['', Validators.required],
      pic:['', Validators.required],
      image:['', Validators.required],


     

    });
   
    this.isumessage = this.FormSimpanData.value.isu;
  
    
    const data = JSON.parse(localStorage.getItem('userData'));
    if(data.userData){
      this.userDetails = data.userData;
      this.pm = data.userData.project_to_pm;
    }else{
      this.userDetails="";
    }
  }

  ionViewWillEnter() {
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
    this.getproject_to_pm();
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
  
  simpan(){
    
    this.authService.postData(this.FormSimpanData.value,'Input_Isu').then((result) => {
      this.responseInputDataRecord = result;      
      if(this.responseInputDataRecord.Input_Isu=="input success"){
       this.authService.postData(this.FormSimpanData.value,'Push_Notif')
        const toast = this.toastCtrl.create({
          message: 'Data berhasil disimpan.',
          duration: 2500
        });
        toast.present();
        this.navCtrl.pop();  
      }
      else{ 
        const toast = this.toastCtrl.create({
          message: 'Data gagal disimpan.',
          duration: 2500
        });
        toast.present();
        
     }    
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: 'Gagal koneksi ke server.',
        duration: 2500
      });
      toast.present();
     
    });
  }

 
  uploadimage() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA
    }  
    this.camera.getPicture(options).then((imagePath) => {
      this.fileURI = imagePath;      
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
            {
              let files = fileInfo as FileEntry;
              files.file(success =>
                {                  
                  this.GaleriName=success.name;
                  console.log(this.GaleriName)
                  this.upload()
                 
                });
            },err =>
            {
              console.log(err);
              throw err;              
            });
        });
        
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });    

  }

  upload(){
    let loader = this.loadingCtrl.create({
      content: "Uploading...",
      duration: 1000
    });
    loader.present();
    let URL="https://pm.inka.co.id/a/upload.php";
      this.fileTransfer = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        chunkedMode: false,
        fileName: this.GaleriName,

      }
  
      this.fileTransfer.upload(this.fileURI, URL, options, true).then((res) => {
          console.log("file uploaded successfully.", res)
          this.GetGaleriNameUpload = this.GaleriName ;
          loader.dismiss();
          this.presentToast("File uploaded successfully");
        }).catch((error) => {
          //here logging an error. 
          console.log('upload failed: ' + JSON.stringify(error));
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });  
    toast.present();
  }


  hapusImage(attachmentnama){
    this.idattachmentDelete={nama_attachment:attachmentnama};
    console.log(this.idattachmentDelete);
    this.authService.postData(this.idattachmentDelete,'Delete_Isu_Image').then((result) => {
      this.postDeleteAttachment = result; 
      
      if(this.postDeleteAttachment.Delete_Attachment){
     this.GetGaleriNameUpload = null;
    }
    else {}
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
   
    });
  
  }

  

 

}
