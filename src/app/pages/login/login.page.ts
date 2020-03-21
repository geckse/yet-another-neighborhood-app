import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../providers/auth-service/auth-service';
import { LoadingController, AlertController } from '@ionic/angular';
import { CanActivate, ActivatedRouteSnapshot,Router,  RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;
  email: string = "";
  password: string = "";

  constructor(
    public auth: AuthService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async signIn(){
    this.loading = await this.loadingController.create({
      message: 'Lade...',
    });
    this.loading.present();

    this.auth.signInAnonymously().then(() => {
      this.router.navigate(['/home'], {
      });
      this.loading.dismiss();
    }).catch(async (e)=>{
      const alert = await this.alertController.create({
        header: 'Ooops!',
        message: e,
        buttons: ['OK']
      });
      await alert.present();
      this.loading.dismiss();
    });
  }

  async continueAnon(){
    this.loading = await this.loadingController.create({
      message: 'Lade...',
    });
    this.loading.present();

    this.auth.signInAnonymously().then(() => {
      this.router.navigate(['/home'], {
      });
      this.loading.dismiss();
    }).catch(async (e)=>{
      const alert = await this.alertController.create({
        header: 'Ooops!',
        message: e,
        buttons: ['OK']
      });
      await alert.present();
      this.loading.dismiss();
    });
  }

}
