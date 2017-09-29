import {BaseMockApi} from "./mock-api";
import {environment} from "../../environments/environment"
/**
 * Created by conan on 7/6/2017.
 */

class AuthApi extends BaseMockApi{

  onInit(){
    this.UrlApi=[
      { UrlApi:'/login',callback:(conn)=>{this.do_login(conn);}}//由于this作用域问题，这里必须用=>函数
    ];
  }
  do_login(conn)
  {
    return this.res(conn,
      {
       accessToken:'111111',
       idToken:'111111',
       expiresIn:60000,
      }
    );
  }
}

export let authApi:AuthApi = Object.assign(new AuthApi(), {UrlPrefix:environment.mock_config.api_prefix} );
