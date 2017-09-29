import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {Router} from "@angular/router";
import {AppSettings, DefaultAppSetting} from "../app.settings";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

describe('AuthService', () => {
  let mockHttp:Http;

  mockHttp = { get: null } as Http;

  spyOn(mockHttp, 'get').and.returnValue(Observable.of({
    json: () => {return {'return_json':''} }
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: Router, useValue:{}},
        {provide:Http,useValue:mockHttp}]
    });
    AppSettings.env_vars=DefaultAppSetting;
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
