import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../providers/auth-service/auth-service';
import { LoadingController, AlertController } from '@ionic/angular';
import { CanActivate, ActivatedRouteSnapshot,Router,  RouterStateSnapshot } from '@angular/router';

import { User } from '../../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  loading: any;
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  displayName: string = "";
  plz: number;

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

  async registerAccount(){
    this.loading = await this.loadingController.create({
      message: 'Lade...',
    });
    this.loading.present();

    this.auth.signupWithEmail(this.email,this.password, this.displayName, this.plz).then(() => {
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
