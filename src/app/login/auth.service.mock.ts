import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class AuthServiceMock {

  private userProfile:any;
  private refreshSubscription: any;

  constructor(public router: Router) {}

  public login(): void {
  }

  public handleAuthentication(): void {
        window.location.hash = '';
        let authResult={};
        this.setSession(authResult);
        this.router.navigate(['/']);
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    this.userProfile = {};
    cb(null, this.userProfile);
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public renewToken() {
    let result={};
    this.setSession(result);
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).mergeMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if(!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

}
