import {MockConnection} from "@angular/http/testing";
import {RequestMethod, Response, ResponseOptions} from "@angular/http";
import {isBoolean, isString} from "util";
/**
 * Created by conan on 7/5/2017.
 */


export interface MockApiRouterItem{
  UrlApi:string;
  callback:(conn:MockConnection)=>void;
};

export class  BaseMockApi {
  public UrlPrefix:string;
  public UrlApi:string|MockApiRouterItem[];
  public UrlRegx:string;

  constructor(UrlPrefix?:string){
    this.UrlPrefix = UrlPrefix;
    this.onInit();
  }
  onInit(){

  }
  protected  match_url(conn:MockConnection):(MockConnection)=>void{
    let url = new URL(conn.request.url);
    if(this.UrlPrefix && !url.pathname.startsWith(this.UrlPrefix))
    {
        return null;
    }
    if(this.UrlApi )
    {
      if( isString(this.UrlApi))
      {
        let match_url = (this.UrlPrefix?this.UrlPrefix:'')+this.UrlApi;
        if(url.pathname.endsWith(match_url))
        {
          return this.get_callback(conn);
        }
      }
      else
      {
        for(let api of this.UrlApi as MockApiRouterItem[])
        {
          let matchurl = (this.UrlPrefix?this.UrlPrefix:'')+api.UrlApi;
          if(url.pathname.endsWith(matchurl))
          {
            if(isString(api.callback)){

            }
            return api.callback;
            //return (conn:MockConnection)=>{api.callback(conn)};
          }
        }
      }
    }

    if(this.UrlRegx && conn.request.url.match(this.UrlRegx))
      return this.get_callback(conn);
    return null;
  }
  protected get_callback(conn){
    if (conn.request.method === RequestMethod.Get) {
        return (mconn:MockConnection)=>{this.do_get(mconn);};
     }
      else if (conn.request.method === RequestMethod.Post) {
        return (mconn:MockConnection)=>{this.do_post(mconn);};
      }
      else if (conn.request.method === RequestMethod.Delete) {
        return (mconn:MockConnection)=>{this.do_del(mconn);};
      }
      else if (conn.request.method === RequestMethod.Patch) {
      return (mconn:MockConnection)=>{this.do_patch(mconn);};
      }
      else if (conn.request.method === RequestMethod.Put) {
        return (mconn:MockConnection)=>{this.do_put(mconn);};
      }
      return null;
  }
  run(conn:MockConnection):boolean{
    let callback = this.match_url(conn);
    if (!callback) {
      return false;
    }
    callback(conn);
    return true;
  }
  error(conn,msg)
  {
    conn.mockError(new Error(msg));
  }

  query_params(conn)
  {
    let url = new URL(conn.request.url);
    return url.search;
  }

  params(conn)
  {
    let params = JSON.parse(conn.request.getBody());
    return params;
  }

  do_get(conn:MockConnection){
    this.res(conn,{});
  }

  do_post(conn:MockConnection){
    this.res(conn,{});
  }

  do_del(conn:MockConnection){
    this.res(conn,{});
  }

  do_patch(conn:MockConnection){
    this.res(conn,{});
  }

  do_put(conn:MockConnection){
    this.res(conn,{});
  }

  public res(conn:MockConnection,result:any,status?:number){
    if(status)
    {
      return conn.mockRespond(new Response(new ResponseOptions(result)));
    }
    if(result.hasOwnProperty('status') &&
      result.hasOwnProperty('body'))
    {
       return conn.mockRespond(new Response(new ResponseOptions(result)));
    }
    else
    {
      return conn.mockRespond(new Response(new ResponseOptions({'status':200,'body':result})));
    }
  }
}
