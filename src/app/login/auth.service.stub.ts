import {Router} from "@angular/router";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/mergeMap";


export class  AuthServiceStub {

  userProfile: any;
  refreshSubscription: any;

  constructor() {}

  public login(): void {
  }

  public handleAuthentication(): void {

  }

  public getProfile(cb): void {

  }

  private setSession(authResult): void {

  }

  public logout(): void {

  }

  public isAuthenticated(): boolean {
    return true;
  }

  public renewToken() {

  }

  public scheduleRenewal() {

  }

  public unscheduleRenewal() {
  }

}

export  const authServiceStub=new AuthServiceStub();
