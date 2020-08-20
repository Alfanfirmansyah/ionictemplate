import { Component } from'@angular/core';
import { NavController, ToastController, ActionSheetController,LoadingController, NavParams } from'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from'@ionic-native/file-transfer';
import { Camera, CameraOptions } from'@ionic-native/camera';
import { FilePath } from'@ionic-native/file-path';
import { File,FileEntry } from'@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
@Component({
  selector: 'page-attachment',
  templateUrl: 'attachment.html'
})
export class AttachmentPage {
  imageURI:any;
  fileURI:any;
  imageFileName:any;
  GetImageNameUpload:any;
  GetGaleriNameUpload:any;
  GaleriName:any;
  GetIdrecord:any;
  arrayType:any;
  filesPath:any;
  fileName:any;
  fileType:any;
  
  
  private fileTransfer: FileTransferObject;
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController, 
    private transfer: FileTransfer,
    private camera: Camera,
    public navParams: NavParams,
    private filePath: FilePath,
    private file: File,
    private fileChooser: FileChooser,
    public loadingCtrl: LoadingController) {

      let id = this.navParams.get('idrecord');
      this.GetIdrecord=id;
  }
  
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilih sumber file',
      buttons: [
        {
          text: 'Ambil foto',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.CAMERA);
           
          }
        },
        {
          text: 'Ambil dari galeri',
          handler: () => {
            this.galeri()
            
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
  

  getImage(sourceType) {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType
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
  uploadFile() {
    const loader = this.loadingCtrl.create({content: "Please wait..."});
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();  
    let URL="https://pm.inka.co.id/a/upload.php";
    
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imageFileName,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }  
    fileTransfer.upload(this.imageURI, URL, options)
      .then((data) => {
      this.GetImageNameUpload=this.imageFileName;
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
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

  galeri(){
    this.arrayType = ["png", "jpg","pdf","docx","xlsx","pptx","txt","PNG","JPG","JPEG","jpeg"];
    this.fileChooser.open()
  .then((uri) => {
    this.fileURI = uri;      
    this.filePath.resolveNativePath(uri)
      .then(filePath => {
        console.log(filePath);
      this.filesPath  = filePath;
      this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
      this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);
      if(this.arrayType.indexOf(this.fileType) > -1)
      {
        this.GaleriName=this.fileName
      }
      else{
        this.presentToast("Format file tidak didukung.");
      }
      });
      
  }, (err) => {
    console.log(err);
    this.presentToast(err);
  }); 

}

  uploadGaleri(){
    const loader = this.loadingCtrl.create({content: "Please wait..."});
    loader.present();
    let URL="https://pm.inka.co.id/a/upload.php";
      this.fileTransfer = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        chunkedMode: false,
        fileName: this.GaleriName,
        params: {'recordid':this.GetIdrecord}

      }
  
      this.fileTransfer.upload(this.fileURI, URL, options, true).then((res) => {
          console.log("file uploaded successfully.", res)
          this.GetGaleriNameUpload = this.GaleriName ;
          this.presentToast("File berhasil diupload");
          loader.dismiss();
          this.navCtrl.pop();
        }).catch((error) => {
          //here logging an error. 
          console.log('upload failed: ' + JSON.stringify(error));
          loader.dismiss();
    })
  }
  }
