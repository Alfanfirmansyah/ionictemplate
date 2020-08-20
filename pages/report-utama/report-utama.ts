import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportIsuPage } from '../report-isu/report-isu';
import { ReportActivityprojectsPage } from '../report-activityprojects/report-activityprojects';
import { ReportActivityplanPage } from '../report-activityplan/report-activityplan';


/**
 * Generated class for the ReportUtamaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-utama',
  templateUrl: 'report-utama.html',
})
export class ReportUtamaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  reportProjectIsu(){

      this.navCtrl.push(ReportIsuPage);
    }

  reportActivityProject(){

      this.navCtrl.push(ReportActivityprojectsPage);
    }

  reportActivityProjectPlan(){

      this.navCtrl.push(ReportActivityplanPage);
    }


}
