import {Component, ElementRef, OnInit} from '@angular/core';
import {NavbarService,NavbarStatus} from "./navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public NavbarStatus = NavbarStatus;
  public isMouseOver:boolean;
  constructor(public navbar:NavbarService,private elRef:ElementRef) {
    this.isMouseOver=false;
  }

  ngOnInit() {
  }
  onMouseLeave()
  {
    this.isMouseOver=false;
  }
  onMouseEnter()
  {
    this.isMouseOver=true;
  }

  open_menu(id:string){
    console.log('open'+id);
    /*let menu = this.elRef.nativeElement.querySelector('#'+id);
    menu.classList.add('open');*/
    this.navbar.open(id);
  }

}
