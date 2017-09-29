import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from "./login-routing.module";
import { LoginFormComponent } from './login-form/login-form.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule, MD_PLACEHOLDER_GLOBAL_OPTIONS} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {AuthGuard} from "./auth-guard.service";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    TranslateModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent, LoginFormComponent],
  providers: [
    AuthService,
    AuthGuard
   // {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' }}
  ]
})
export class LoginModule { }
