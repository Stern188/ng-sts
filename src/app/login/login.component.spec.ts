import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginFormComponent} from "./login-form/login-form.component";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {authServiceStub} from "./auth.service.stub";
import {AuthService} from "./auth.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,LoginFormComponent ],
      imports:[FormsModule,BrowserAnimationsModule,MaterialModule],
      providers:[ {provide: AuthService, useValue:authServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
