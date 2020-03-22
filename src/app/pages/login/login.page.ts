import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../providers/auth-service/auth-service';
import { LoadingController, AlertController } from '@ionic/angular';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  plzalert: any;
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

    this.auth.signIn(this.email,this.password).then(() => {
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

    this.plzalert = await this.alertController.create({
      header: 'Postleitzahl eingeben',
      subHeader: 'Finde deine Nachbarschaft anhand deiner Postleitzahl.',
      inputs: [
        {
          name: 'plz',
          type: 'text',
          label: 'Postleitzahl',
          value: '',
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Weiter',
          handler: async (data) => {

            if(String(parseInt(data.plz)).length == 5){
                this.loading = await this.loadingController.create({
                    message: 'Lade...',
                });
                this.loading.present();

                this.auth.signInAnonymously(parseInt(data.plz)).then(() => {
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
            } else {
              const alert = await this.alertController.create({
                header: 'Ungültige Postleitzahl',
                subHeader: 'Bitte gebe eine gültige Postleitzahl an.',
                buttons: [{
                  text: 'OK',
                  hander: () => {
                      this.continueAnon();
                  }
                }]
              });

              await alert.present();
            }

          }
        }
      ]
    });

    this.plzalert.present();

  }

  openRegisterPage(){
    this.router.navigate(['/sign-up'], {
    });
  }

}
