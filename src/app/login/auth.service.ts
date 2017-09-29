import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AppSettings} from "../app.settings";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/mergeMap";
import 'rxjs/add/operator/catch';
import * as auth0 from 'auth0-js';
import {User} from "./user";
import {Http} from "@angular/http";

@Injectable()
export class AuthService {

  userProfile: any;
  refreshSubscription: any;

  auth0 = new auth0.WebAuth({
    clientID: AppSettings.env_vars.AUTH_CONFIG.clientID,
    domain: AppSettings.env_vars.AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AppSettings.env_vars.AUTH_CONFIG.apiUrl,
    redirectUri: AppSettings.env_vars.AUTH_CONFIG.redirectUri,
    scope: 'openid profile'
  });

  constructor(public router: Router,private http:Http) {}

  public login(user:User): void {
    /*https://127.0.0.1/authorize?client_id=ngCloud&
    response_type=token%20id_token&
    scope=openid%20profile&
    audience=127.0.0.1&
    state=VXicY7h.SHBbPhKuxKM2rmJaz.VLrzN9&
    nonce=6Td88oFUcNUxSHTw_QVssDvKwnG0ehIb&
    auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOC44LjAifQ%3D%3D*/
    this.http.post(AppSettings.env_vars.AUTH_CONFIG.apiUrl,
      {
        name:user.name,
        password:user.password,
        response_type:['token','id_token'],
        scope:'web',
        client_type:'webui',
        client_id:'',
      })
      .map(response => response.json())
      .catch( (error,caught) => {return Observable.throw('Error')} )
      .subscribe(
          authResult=>{
            this.setSession(authResult);
            this.router.navigate(['/']);
          }
      );
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    //this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.unscheduleRenewal();
    // Go back to the login route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    if( localStorage.getItem('access_token') &&
       localStorage.getItem('expires_at')) {
      // Check whether the current time is past the
      // access token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return Date.now() < expiresAt;
    }
    return false;
  }

  public renewToken() {
    this.auth0.renewAuth({
      audience: AppSettings.env_vars.AUTH_CONFIG.apiUrl,
      redirectUri: 'http://localhost:3001/silent',
      usePostMessage: true
    }, (err, result) => {
      if (err) {
        alert(`Could not get a new token using silent authentication (${err.error}).`);
      } else {
        alert(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
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
