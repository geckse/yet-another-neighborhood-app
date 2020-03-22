import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../providers/auth-service/auth-service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  loading: any;

  constructor(public auth: AuthService, private loadingController: LoadingController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async doLogout(){
    this.loading = await this.loadingController.create({
      message: 'Logout...',
    });
    this.loading.present();
    this.auth.logout().then( async () => {
      this.loading.dismiss();
      this.navCtrl.navigateRoot('/login');
    }).catch((e)=>{
      this.loading.dismiss();      
      this.navCtrl.navigateRoot('/login');
    });
  }

}
