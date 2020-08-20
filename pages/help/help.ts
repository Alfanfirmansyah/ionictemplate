import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  
  searchTerm : any="";
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data=[
      {"id":1,"label":"1.	Apa itu Logbook APP ? ","name":"Logbook APP merupakan aplikasi yang dibuat untuk mempermudah proses mencatat setiap aktivitas project yang ada di PT INKA"},
      {"id":2,"label":"2.	Apa itu Menu Project ?","name":"Menu Project Merupakan tampilkan beberapa project yang sedang dikerjakan."},
      {"id":3,"label":"3.	Apa itu Menu Activity Project ?","name":"Menu activity project merupakan tampilan untuk melihat progress aktivitas project yang sudah dikerjakan. Selain itu pada menu ini juga digunakan untuk menambahkan setiap progress kerja yang telah dilakukan."},
      {"id":4,"label":"4.	Apa itu Menu Activity Plan ? 	","name":"Menu ini digunakan untuk menambahkan plan kerja oleh Management dan Project Manager untuk dikerjakan personel dibawahnya."},
      {"id":5,"label":"5.	Apa itu Menu Project Issue ?	","name":"Menu ini digunakan untuk menambahkan issue yang sedang terjadi pada setiap project."},
      {"id":6,"label":"6.	Apa yang harus diperhatikan saat login ?","name":"Kamu harus mengingat data yang diinput dan hak akses yang dimiliki sehingga pada saat verifikasi data, data yang dimasukkan sudah benar dan login sesuai hak akses."},
      {"id":7,"label":"7.	Apakah semua karyawan mempunyai hak akses untuk menggunakan logbook APP?","name":"Semua karyawan PT. INKA mempunyai hak akses untuk menggunakan logbook APP, namun untuk hak akses yang dimiliki berbeda-beda sesuai dengan jobdesk yang telah ditentukan."},
      {"id":8,"label":"8.	Apakah bisa 1 hak akses logbook app login pada lebih dari 1 device ?","name":"Bisa karena aplikasi ini support multiple device"},
      {"id":9,"label":"9.	Apabila mengalami kesulitan atau gangguan dapat menghubungi kontak dibawah ini : ","name":"Contact Person ( Andi Hartanto : +6281332171031 ) "},
     
      ];
  }

  reset(){
    this.data=[
      {"id":1,"label":"1.	Apa itu Logbook APP ? ","name":"Logbook APP merupakan aplikasi yang dibuat untuk mempermudah proses mencatat setiap aktivitas project yang ada di PT INKA"},
      {"id":2,"label":"2.	Apa itu Menu Project ?","name":"Menu Project Merupakan tampilkan beberapa project yang sedang dikerjakan."},
      {"id":3,"label":"3.	Apa itu Menu Activity Project ?","name":"Menu activity project merupakan tampilan untuk melihat progress aktivitas project yang sudah dikerjakan. Selain itu pada menu ini juga digunakan untuk menambahkan setiap progress kerja yang telah dilakukan."},
      {"id":4,"label":"4.	Apa itu Menu Activity Plan ? 	","name":"Menu ini digunakan untuk menambahkan plan kerja oleh Management dan Project Manager untuk dikerjakan personel dibawahnya."},
      {"id":5,"label":"5.	Apa itu Menu Project Issue ?	","name":"Menu ini digunakan untuk menambahkan issue yang sedang terjadi pada setiap project."},
      {"id":6,"label":"6.	Apa yang harus diperhatikan saat login ?","name":"Kamu harus mengingat data yang diinput dan hak akses yang dimiliki sehingga pada saat verifikasi data, data yang dimasukkan sudah benar dan login sesuai hak akses."},
      {"id":7,"label":"7.	Apakah semua karyawan mempunyai hak akses untuk menggunakan logbook APP?","name":"Semua karyawan PT. INKA mempunyai hak akses untuk menggunakan logbook APP, namun untuk hak akses yang dimiliki berbeda-beda sesuai dengan jobdesk yang telah ditentukan."},
      {"id":8,"label":"8.	Apakah bisa 1 hak akses logbook app login pada lebih dari 1 device ?","name":"Bisa karena aplikasi ini support multiple device"},
      {"id":9,"label":"9.	Apabila mengalami kesulitan atau gangguan dapat menghubungi kontak dibawah ini : ","name":"Contact Person ( Andi Hartanto : +6281332171031 ) "},

      ];
  }
  
 setFilteredItems(ev: any) {
  this.reset()
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.data = this.data.filter((item) => {
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }


}



}
