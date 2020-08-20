import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';

/**
 * Generated class for the MactivityplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mactivityplan',
  templateUrl: 'mactivityplan.html',
})
export class MactivityplanPage {
  
  pages = [

    { pageName: 'ArencanaPage', title: 'Rencana', icon: 'list-box', id: 'openTab'},
    { pageName: 'AprogressPage', title: 'Progress', icon: 'trending-up', id: 'closeTab'},
    { pageName: 'AterealisasiPage', title: 'Terealisasi', icon: 'checkmark-circle', id: 'upTab'},

  ];

  selectedTab = 0;
 
  @ViewChild(SuperTabs) superTabs: SuperTabs;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  onTabSelect(ev: any) {
   
      this.selectedTab = ev.index;
      this.superTabs.clearBadge(this.pages[ev.index].id);
    
  }

 

}
