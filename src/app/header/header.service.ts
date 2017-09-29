import { Injectable } from '@angular/core';
import {AuthService} from "../login/auth.service";

export class MegaMenuitem{
  name:string=null;
  id:string=null;
  index:number=100;
  link:string=null;
  icon:string=null;
  open:boolean=false;
  sidebar_menu_id:string=null;
  sidebar_menu_namespace:string=null;
  submenu:null|MegaMenuitem[]=null;

  constructor(d){
    let me=this;
    Object.keys(d).forEach(x=>{
      if(x != 'submenu'){
        if(x in me){
          me[x]=d[x];
        }
      }
      else {
        this.submenu=[];
        for(let s of d['submenu']){
          this.submenu.push(new  MegaMenuitem(s));
        }
      }
    });
  }
};
export enum NavbarStatus{
  open=0,
  toggle,
  close,
};

@Injectable()
export class HeaderService {

  constructor(public auth:AuthService) {

  }

  getMegaMenu(){

  }
  logout(){
    this.auth.logout();
  }

}
