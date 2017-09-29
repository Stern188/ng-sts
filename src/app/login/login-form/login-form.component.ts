import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  selector: 'ngCloud-loginForm',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {


  public user:User;
  private auth:AuthService;
  constructor(auth:AuthService) {
    this.auth=auth;
    this.user=new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.login(this.user);
  }

}
