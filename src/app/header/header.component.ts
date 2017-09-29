import { Component, OnInit } from '@angular/core';
import {HeaderService} from "./header.service";
import {NavbarService} from "../navbar/navbar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public megaMenu:any;
  constructor(public header:HeaderService,private navbar:NavbarService) { }

  ngOnInit() {
    this.megaMenu = this.header.getMegaMenu();
  }

  sidebar_toggle()
  {
    console.log('toggle nav');
    this.navbar.toggle();
  }


  logout(){
    this.header.logout();
  }
}
