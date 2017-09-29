/**
 * Created by conan on 7/6/2017.
 */
import { Injectable }     from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot}    from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.auth.isAuthenticated()){
      console.log('AuthGuard#canActivate called');
      return true;
    }
    //redirect to state.url
    this.router.navigate(['/login',{callback:state.url}]);
    return false;
  }
}
