import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginModule } from "./login/login.module";
import { Router } from "@angular/router";
import { AuthService } from "./login/auth.service";
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { BaseRequestOptions, Http, HttpModule, RequestOptions, XHRBackend } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import "hammerjs"; //@angular/material依赖hammerjs;
import { MaterialModule, MdNativeDateModule } from "@angular/material";
import { HttpBackendProvider } from "./mockapi/mockapi.provider";
import { MockBackend } from "@angular/http/testing";
import { HeaderComponent } from './header/header.component';
import { HeaderService } from "./header/header.service";
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from "./navbar/navbar.service";
import { TopCommonModule } from "./common/topcommon.module";
import { PageModule } from "./page/page.module";//demo页面可以删除
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-modialog";
import { VexModalModule } from "ngx-modialog/plugins/vex";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MembersModuleAddMenu } from "./members/members.module";
import { MembersService } from './members/members.service';
import { ProjectsModuleAddMenu } from "./projects/projects.module";
import { ProjectsService } from './projects/projects.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TopCommonModule,
    MaterialModule,
    MdNativeDateModule,
    DynamicFormsCoreModule.forRoot(),
    ModalModule.forRoot(),
    VexModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginModule,
    PageModule,
  ],
  exports: [
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    HttpBackendProvider,
    MockBackend,
    BaseRequestOptions,
    XHRBackend,
    AuthService,
    HeaderService,
    NavbarService,
    MembersService,
    ProjectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router, navbar: NavbarService) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    //if use lazyload ,call Addmenu
    MembersModuleAddMenu(navbar);
    ProjectsModuleAddMenu(navbar);
    //add default menu navbar.add_menu();
  }
}
