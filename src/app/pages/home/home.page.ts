import { Component } from '@angular/core';

import { AuthService } from './../../providers/auth-service/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts: any = {
    slidesPerView: 'auto'
  };

  constructor(public auth: AuthService) {}

}
