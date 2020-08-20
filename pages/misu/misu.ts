import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';

/**
 * Generated class for the MisuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-misu',
  templateUrl: 'misu.html',
})
export class MisuPage {
  
  pages = [
    { pageName: 'OpenisupagePage', title: 'Open Isu', icon: 'alert', id: 'openTab'},
    { pageName: 'CloseisupagePage', title: 'Close Isu', icon: 'checkmark-circle', id: 'closeTab'}
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
