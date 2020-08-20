import { Component } from'@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from'ionic-angular';
import { Validators,FormBuilder,FormGroup } from'@angular/forms';
import { CommonProvider } from'../../providers/common/common';
import { AuthServiceProvider } from'../../providers/auth-service/auth-service';

/**
 * Generated class for the FormEditPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-edit-plan',
  templateUrl: 'form-edit-plan.html',
})
export class FormEditPlanPage {
  responseEditDataPlan:any;
  GetIdplan:any;
  postDataPlan:any;
  Data_Plan:any;
  postDataProject:any;
  Data_Project:any;
  postDataUser:any;
  Data_User:any;
  selectedMaschine: string = "";
  saktivitasd:string = "";
  picd:string="";
  laktivitasd:string="";
  tglawal:string="";
  tglakhir:string="";
  public FormEditData:FormGroup;
  userDetails:any;
  pm:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder, 
    public authService:AuthServiceProvider,
    public common : CommonProvider,
    public toastCtrl: ToastController) {

      const data = JSON.parse(localStorage.getItem('userData'));
      if(data.userData){
        this.userDetails = data.userData;
        this.pm = data.userData.project_to_pm;
      }else{
        this.userDetails="";
      }
      this.selectedMaschine = navParams.get('selectedMaschine');
      this.saktivitasd = navParams.get('saktivitasd');
      this.picd = navParams.get('picd');
      this.laktivitasd = navParams.get('laktivitasd');
      this.FormEditData=this.formBuilder.group({
        id_plan:[''],
        maschine:['', Validators.required],
        tglstart:['', Validators.required],
        tglakhir:['', Validators.required],
        aktivitas:['', Validators.required],
        deskripsi:['', Validators.required],
        catatan:[''],
        pic:['', Validators.required],
        laktivitas:['', Validators.required],

      });
  }

 

  ionViewWillEnter() {
    //ambil data dari databaseuntuk di tampilkan di form
    this.common.presentLoading();
    let id = this.navParams.get('idplan');
    this.GetIdplan={id_plan:id};    
    this.authService.postData(this.GetIdplan,'Get_Plan_Edit').then((result) => {
      this.postDataPlan = result;      
      if(this.postDataPlan.Get_Plan_Edit){
        this.Data_Plan=this.postDataPlan.Get_Plan_Edit;
        this.selectedMaschine=this.postDataPlan.Get_Plan_Edit[0].project_id;
        this.tglawal=this.postDataPlan.Get_Plan_Edit[0].plan_start_date;
        this.tglakhir=this.postDataPlan.Get_Plan_Edit[0].plan_end_date;
        this.laktivitasd=this.postDataPlan.Get_Plan_Edit[0].level_priority;
        this.picd=this.postDataPlan.Get_Plan_Edit[0].pic;
        console.log(this.Data_Plan);
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

    this.getProject();
    this.getPic();
  
  }
  getProject(){
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
  getPic(){
    this.authService.GetData('Data_User').then((result) => {
      this.postDataUser = result;      
      if(this.postDataUser.Data_User){
        this.Data_User=this.postDataUser.Data_User;
        console.log(this.Data_User)

      }
      else{ 
        this.Data_User='';
      
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
    console.log(this.FormEditData.value);
    this.common.presentLoading();
    this.authService.postData(this.FormEditData.value,'Edit_Plan').then((result) => {
      this.responseEditDataPlan = result;      
      if(this.responseEditDataPlan.Edit_Plan=="Edit success"){
        const toast = this.toastCtrl.create({
          message: 'Data berhasil diubah.',
          duration: 2500
        });
        toast.present();
        this.common.closeLoading();
        this.navCtrl.pop();
      }
      else{ 
        const toast = this.toastCtrl.create({
          message: 'Data gagal diubah.',
          duration: 2500
        });
        toast.present();
        this.common.closeLoading();
     }    
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: 'Gagal koneksi ke server.',
        duration: 2500
      });
      toast.present();
      this.common.closeLoading();
    });
  }

}
