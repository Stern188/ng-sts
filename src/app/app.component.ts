import {Component, OnInit} from '@angular/core';
import {AuthService} from "./login/auth.service";
import {Router} from "@angular/router";
import {NavbarService, NavbarStatus} from "./navbar/navbar.service";
import {TranslateService} from "@ngx-translate/core";

declare  let jQuery:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',
    '../../node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  public NavbarStatus = NavbarStatus;
  constructor(public auth: AuthService,public router:Router,public navbar:NavbarService,public translate:TranslateService){
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('zh_CN');
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      //translate.use('zh_CN');
  }
  ngOnInit(){
    jQuery.material.init();
    if(!this.auth.isAuthenticated())
    {
      this.router.navigate(['/login']);
    }
  }
  do_logout(){
    this.auth.logout();
  }
}
