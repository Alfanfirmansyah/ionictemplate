import { Component } from'@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ActionSheetController } from'ionic-angular';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';
import { AttachmentPage } from '../attachment/attachment';
import { FormEditRecordPage } from '../form-edit-record/form-edit-record';
import { FileOpener } from '@ionic-native/file-opener';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from'@ionic-native/file-transfer';
import { AndroidPermissions } from '@ionic-native/android-permissions';


/**
 * Generated class for the DetailRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-record',
  templateUrl: 'detail-record.html',
})
export class DetailRecordPage {
  GetIdrecord:any;
  postDataRecord:any;
  Data_Record:any;
  postDataAttachment:any;
  Data_Attachment:any;
  
  Cobaid:any;
  inAppBrowser: any;
  idrecordDelete:any;
  postDelete:any;
  idattachmentDelete:any;
  postDeleteAttachment:any;
  userDetails:any;

  id:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, 
    private fileOpener: FileOpener,
    private photoViewer: PhotoViewer,
    private file: File,
    private transfer: FileTransfer,
    private androidPermissions: AndroidPermissions

    ) {
      
      
      const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
      }else{
        this.userDetails="";
      }

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);
  }

  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    this.id = this.navParams.get('idrecord');
    console.log(this.id)
    this.GetIdrecord={id_record:this.id};    
    this.authService.postData(this.GetIdrecord,'Get_Record_Detail').then((result) => {
      this.postDataRecord = result;      
      if(this.postDataRecord.Get_Record_Detail){
        this.Data_Record=this.postDataRecord.Get_Record_Detail;
        console.log(this.Data_Record);
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
    this.getattachment();
  }

  getattachment(){
    let id = this.navParams.get('idrecord');
    this.GetIdrecord={id_record:id};    
    this.authService.postData(this.GetIdrecord,'Get_Attachment').then((result) => {
      this.postDataAttachment = result;      
      if(this.postDataAttachment.Get_Attachment){
        this.Data_Attachment=this.postDataAttachment.Get_Attachment;
      }
      else{ 
        this.Data_Attachment='';
     }     
    }, (err) => {
      const toast = this.toastCtrl.create({
      message: 'Gagal koneksi ke server.'+err,
      duration: 2500
    });
    toast.present();
    }); 

  }
  attachment(idrecord){
    this.navCtrl.push(AttachmentPage,{
      idrecord: idrecord
    });
  }

Hapus(recordid){
  this.idrecordDelete={id_record:recordid};
  this.authService.postData(this.idrecordDelete,'Delete_Record').then((result) => {
    this.postDelete = result;
    const toast = this.toastCtrl.create({
      message: 'Data berhasil dihapus.',
      duration: 2500
    });
    toast.present();           
  }, (err) => {
    const toast = this.toastCtrl.create({
    message: 'Gagal koneksi ke server.'+err,
    duration: 2500
  });
  toast.present();
  
 
  });
}
showDelete(recordid) {
  const confirm = this.alertCtrl.create({
    message: 'Apakah anda yakin akan menghapus data ini?',   
    buttons: [
      {
        text: 'no',
        handler: () => {
        }
      },
      {
        text: 'yes',
        handler: () => {
          this.Hapus(recordid);
          this.navCtrl.pop();
          
        }
      }
    ]
  });
  confirm.present();
}
showConfirm(recordid) {
  const confirm = this.alertCtrl.create({
    buttons: [
      {
        text: 'Edit Data',
        handler: () => {
          this.pageEdit(recordid)
        }
      },
      {
        text: 'Delete Data',
        handler: () => {
          this.showDelete(recordid);
        }
      }
    ]
  });
  confirm.present();
}
pageEdit(recordid){
  this.navCtrl.push(FormEditRecordPage,{
    idrecord: recordid
  });
}

presentActionSheet(attachmentid,attachmentnama) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Option File Attachment',
    buttons: [
      {
        text: 'Hapus File Attachment',
        handler: () => {
          this.HapusAttachment(attachmentid,attachmentnama);
          
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

HapusAttachment(attachmentid,attachmentnama){
  this.idattachmentDelete={id_attachment:attachmentid,nama_attachment:attachmentnama};
  console.log(this.idattachmentDelete);
  this.authService.postData(this.idattachmentDelete,'Delete_Attachment').then((result) => {
    this.postDeleteAttachment = result; 
    
    if(this.postDeleteAttachment.Delete_Attachment){
      let id = this.navParams.get('idrecord');
      this.GetIdrecord={id_record:id};    
      this.authService.postData(this.GetIdrecord,'Get_Attachment').then((result) => {
        this.postDataAttachment = result;      
        if(this.postDataAttachment.Get_Attachment){
          this.Data_Attachment=this.postDataAttachment.Get_Attachment;
          const toast = this.toastCtrl.create({
            message: 'File Attachment berhasil dihapus.',
            duration: 2500
          });
          toast.present();
        }
        else{ 
          this.Data_Attachment='';
       }     
      }, (err) => {
      });
   
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


openImage(url: string){
  const encodeUrl = encodeURIComponent(url);
  this.photoViewer.show('https://pm.inka.co.id/a/download.php?params='+encodeUrl, url, {share: true});
}

download(url) {
  const encodeUrl = encodeURIComponent(url);
  this.common.presentLoading();
  const fileTransfer: FileTransferObject = this.transfer.create();
  const url2 = 'https://pm.inka.co.id/a/download.php?params='+encodeUrl;
  fileTransfer.download(url2, this.file.externalRootDirectory +'Download/' + url).then((entry) => {
    console.log('download complete: ' + entry.toURL());
    this.common.closeLoading();
    let fileExtn=url.split('.').reverse()[0];
    let fileMIMEType=this.getMIMEtype(fileExtn);
         this.fileOpener.open("file:///storage/emulated/0/download/"+ url+"", fileMIMEType)
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));
  }, (error) => {
    console.log(error)
    // handle error
  });
}

getMIMEtype(extn){
  let ext=extn.toLowerCase();
  let MIMETypes={
    'txt' :'text/plain',
    'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'doc' : 'application/msword',
    'pdf' : 'application/pdf',
    'jpg' : 'image/jpeg',
    'bmp' : 'image/bmp',
    'png' : 'image/png',
    'xls' : 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'rtf' : 'application/rtf',
    'ppt' : 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  }
  return MIMETypes[ext];
}
}

