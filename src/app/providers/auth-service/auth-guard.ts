import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router,  RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  revived: boolean = false;

  constructor(
  	private auth: AuthService,
  	private router: Router,
  	private splashScreen: SplashScreen
  ) {  };
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // try the auth revive
	  if(!this.revived){
	  	return this.auth.reviveFromCache().then((logedIn) => {
		  	this.revived = true;
		  	// at this point the splash screen is propably still active, remove it
		  	this.splashScreen.hide();
        if(logedIn){
	  		  return true;
        } else {

          this.router.navigate(['/login'], {
  	        queryParams: {
  	          return: state.url
  	        }
  	      });
          return false;
        }
	  	}).catch((e)=>{
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
        });
        return false;
      });

	   } else { // session revived, but is it still valid?
	    if(this.auth.isLoggedIn()){
		    return true;
	    } else {
		    this.router.navigate(['/login'], {
	        queryParams: {
	          return: state.url
	        }
	      });
	      return false;
	    }
	   }

  }
}
