/**
 * Created by conan on 6/30/2017.
 */
export interface IEnvVars {
  ENV: string;
  API_URL: string;
  AUTH_CONFIG:{
    clientID: string;
    domain: string;
    responseType: string;
    apiUrl: string;
    redirectUri: string;
  }
}

export const DefaultAppSetting = {
  ENV:'',
  API_URL: "http://127.0.0.1/api_1.0",
  AUTH_CONFIG:{
    clientID: 'ngCloud',
    domain: '127.0.0.1',
    responseType: 'json',
    apiUrl: 'http://127.0.0.1/api_1.0/login',
    redirectUri: ''
  }
}
export class AppSettings {
  public static env_vars: IEnvVars;
}
