/**
 * Created by conan on 7/5/2017.
 */
import {BaseMockApi} from './mock-api';
import {MockConnection} from "@angular/http/testing";
import {RequestMethod} from "@angular/http";
import {UUID} from "../common/uuid";
import {isArray, isObject} from "util";

export class RESTMockApi extends BaseMockApi{
  RestResource:string;
  datas:any[];
  idName:string;

  apiPrefix:string;
  resourceName:string;
  urlMatcher:string[];

  private __parse_urlapi() {
    this.apiPrefix='';
    let urlapi = (this.UrlPrefix?this.UrlPrefix:'')+this.UrlApi;
    let urlMatcher=urlapi.split('/');
    let shift_count = 0;
    for(let u of urlMatcher){
      if(u.startsWith(':'))//find first param
      {
        this.urlMatcher = urlMatcher.splice(shift_count);
        break;
      }
      this.apiPrefix+=u;
      this.apiPrefix+='/';
      shift_count += 1;
    }
  }


  protected  gen_id():string{
    return UUID.UUID();
  }

  protected  match_url(conn:MockConnection):(MockConnection)=>void{
    let url = new URL(conn.request.url);

    if(this.UrlPrefix && !url.pathname.startsWith(this.UrlPrefix))
    {
        return null;
    }

    if(!this.urlMatcher) {
      this.__parse_urlapi();
    }

    if(this.apiPrefix) {
      if(!((this.apiPrefix.length > url.pathname.length
          && (url.pathname + '/').startsWith(this.apiPrefix))
        ||url.pathname.startsWith(this.apiPrefix)))
      {
        return null;
      }
    }

    let param=[];
    let match=true;
    let pathname = url.pathname.substr(this.apiPrefix.length);
    let domains = pathname.split('/');
    for(let i in domains) {
      let _p = {};
      if(domains[i] === "")
        continue;
      if(!this.urlMatcher[i])//最大匹配
      {
         break;
      }
      if(this.urlMatcher[i].startsWith(':')) {//it's param
       _p['key']=this.urlMatcher[i].slice(1);
       _p['value']=domains[i];
      }
      else if(domains[i] !== this.urlMatcher[i])
      {
        match=false;
        break;
      }
      else
      {
        _p['key']=this.urlMatcher[i];
      }
      param.push(_p);
    }

    if(match){
      if(param.length > 0) {
        Object.assign(conn.request, {restparams: param});
      }
      return this.get_callback(conn);
    }
    return null;

  }

  /**
   * 从conn连接中取出根据URL计算的参数
   * @param conn
   * @returns {null}
   * @private
   */
  protected __get_restParams(conn){
    if(Object.keys(conn.request).includes('restparams'))
    {
       return  conn.request['restparams'];
    }
    return null;
  }

  protected  __get_dataByparam(restparams){
    if(!restparams) //get all data
      return this.datas;

    let data = this.datas;
    for(let p of restparams)//list of rest params
    {
      if(p['value']){
        let d = data.find((x)=>x[p['key']] == p['value']);
        if(d){
          data = d ;
        }
        else{
          return null;
        }
      }else{
        data=data[p['key']];
        if(! data){
          return null;
        }
      }
    }
    return data;
  }
  protected  __get_nextMatch(restparams){
    if(!restparams)
      return this.urlMatcher[0];

    if( restparams.length < this.urlMatcher.length)
      return this.urlMatcher[ restparams.length ] ;
    return null;
  }

  do_get(conn){
    let restparams = this.__get_restParams(conn);
    let data = this.__get_dataByparam(restparams);

    if(! data) {
      return this.res(conn, {'error': 404, 'msg': 'object not found!'}, 404);
    }
    return this.res(conn,data);
  }

  protected gen_newObject(conn,obj):any{
    return obj;
  }

  do_post(conn){
    let restparams = this.__get_restParams(conn);
    let data = this.__get_dataByparam(restparams);
    if(!data)
      return this.res(conn, {'error': 404, 'msg': 'object not found!'}, 404);

    let nextAttr = this.__get_nextMatch(restparams);
    if(!nextAttr || !nextAttr.startsWith(':'))//not ID param
      return this.res(conn, {'error': 502, 'msg': 'create new object error!'}, 500);
    let obj=this.params(conn);//create obj form post params
    if(!obj)
      obj={}
    let key = nextAttr.slice(1);//get id name
    obj[key] = this.gen_id();
    obj = this.gen_newObject(conn,obj);//fill obj hook
    //insert obj to data
    if(isArray(data))
    {
      data.push(obj);
    }
    else if(isObject(data)) {
      data[obj[key]] = obj;
    }
    return this.res(conn,obj);
  }

}
