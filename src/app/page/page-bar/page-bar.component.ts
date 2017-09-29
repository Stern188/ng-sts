import {Component, Input, OnInit} from '@angular/core';
import {isArray, isUndefined} from "util";
import {NavbarService} from "../../navbar/navbar.service";

@Component({
  selector: 'app-pagebar',
  templateUrl: './page-bar.component.html',
  styleUrls: ['./page-bar.component.scss']
})
export class PageBarComponent implements OnInit {

  @Input() posstion:string='top';
  @Input() breadcrumb:string|any[];

  public breadcrumbs:any[];

  constructor(private navbar:NavbarService) { }

  ngOnInit() {
    this.breadcrumbs=[];
    if(isUndefined(this.breadcrumb)){
      //auto set by navbar
      this._set_breadcrumbs_byNavbar();
    }
    else if(isArray(this.breadcrumb))
    {
      //set by array
      this._set_breadcrumbs_byArray(this.breadcrumb);
    }

  }

  private _set_breadcrumbs_byArray(datas){
    this.breadcrumbs=[];
    for(let x in datas){
      x['name']=x['name']?x['name']:'';
      this.breadcrumbs.push(x);
    }
  }

  private _set_breadcrumbs_byNavbar(){
    this.breadcrumbs=[];
    let menus= this.navbar.menus;
    let find = false;
    for(let id of this.navbar.menu_openid)
    {
      find = false;
      for(let item of menus) {
        if (item.id == id) {
          this.breadcrumbs.push(item);
          menus = item.submenu;
          find = true;
          break;
        }
      }
      if(find==false)
        return;
    }
  }

}
