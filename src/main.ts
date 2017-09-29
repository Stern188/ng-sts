import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {AppSettings,IEnvVars,DefaultAppSetting} from "./app/app.settings";

if (environment.production) {
  enableProdMode();
}

function app_start(){
  //启动进程，以下代码只能有一行，所以封装为app_start函数，没事别动
  platformBrowserDynamic().bootstrapModule(AppModule);
}

//加载server返回的环境变量
fetch('/env-vars', {method: 'get'}).then((response) => {
  if(response.ok)
  {
    response.json().then((env_vars:IEnvVars) => {
      //解析成功,合并生成配置
      AppSettings.env_vars = Object.assign({},DefaultAppSetting,env_vars);
      app_start();
    }).catch((e)=>{
      //解析失败，env-vars格式不正确
      console.error(e);
      AppSettings.env_vars = DefaultAppSetting;
      app_start();
    });
  }
  else {
    //从server获取失败，直接用默认配置
    AppSettings.env_vars = DefaultAppSetting;
    app_start();
  }
});
