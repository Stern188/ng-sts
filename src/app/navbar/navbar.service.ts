import {EventEmitter, Injectable} from '@angular/core';
import {isArray} from "rxjs/util/isArray";
import {Router} from "@angular/router";

export class Menuitem{
  name:string=null;
  id:string=null;
  index:number=100;
  link:string=null;
  icon:string=null;
  open:boolean=false;
  submenu:null|Menuitem[]=null;

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
          this.submenu.push(new  Menuitem(s));
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
export class NavbarService {


  private _status:NavbarStatus;
  public toggle_event:EventEmitter<NavbarStatus>;
  public all_menus:any;
  public _namespace:string='default'
  public menus:any;
  public menu_openid:string[];

  constructor(private router:Router) {
    this.toggle_event = new EventEmitter<NavbarStatus>();
    this.status=NavbarStatus.open;
    this.menu_openid=[];
    this.all_menus={'default':[]};
    this.menus=this.all_menus['default'];
  }

  private  merge_menu(m1,m2)
  {
    if(m2 == null ){
      return;
    }
    for(let m of m2) {
      let findid=false;
      for(let o of m1) {
        if(m.id === o.id) {
          findid=true;//find
          o.name = m.name?m.name:o.name;
          o.index= m.index?m.index:o.index;
          o.link= m.link?m.link:o.link;
          this.merge_menu(o.submenu,m.submenu);
          break;
        }
      }
      if(!findid) {
        m1.push(m);
      }
    }
    m1=m1.sort((x1,x2)=>{
      return x1.index - x2.index;
    });
    return m1;
  }

  add_menu(menud,namespace:string='default')
  {
    let menu = [];
    if(isArray(menud))
    {
      for(let m of menud){
        menu.push(new Menuitem(m));
      }
    }
    else {
      menu.push(new Menuitem(menud));
    }
    if(!this.all_menus[namespace])
    {
       this.all_menus[namespace]=[];
    }
    this.merge_menu( this.all_menus[namespace] ,menu);
  }

  toggle(status?:NavbarStatus)
  {
    ////三种模式循环
    //this.status= (this.status+1)%3;

    //两种模式循环
    this.status = this.status==NavbarStatus.open?
      NavbarStatus.toggle:NavbarStatus.open;
  }

  get status()
  {
    return this._status;
  }

  set status(s:NavbarStatus)
  {
    this._status=s;
    this.toggle_event.next(s);
  }

  get namespace(){
    return this._namespace ;
  }

  set namespace(ns){
    this._namespace=ns;
    this.menus=this.all_menus[this._namespace];
  }

  private open_menu(menus,id:string){
    let opend=false;
    for(let item of menus) {
        if(item.id === id) {
          item.open=true;
          opend=true;
          this.menu_openid.push(id);
          console.log('open '+id);
          if(item.link){
            this.router.navigateByUrl(item.link);
          }
        }
        else {
          item.open=false;
          if(item.submenu && opend==false)
          {
            item.open = this.open_menu(item.submenu,id);
            if(item.open){
              opend=true;
              this.menu_openid.unshift(item.id);
            }
          }
        }
    }
    return opend;
  }

  open(id:string)
  {
    this.menu_openid=[];
    this.open_menu(this.menus,id);
  }

}
