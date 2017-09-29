import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "@angular/material";
import {authServiceStub} from "../auth.service.stub";
import {AuthService} from "../auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports:[FormsModule,BrowserModule,BrowserAnimationsModule,MaterialModule],
      providers:[ {provide: AuthService, useValue:authServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
