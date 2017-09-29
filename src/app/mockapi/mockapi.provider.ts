import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {environment} from '../../environments/environment';
import {mockRouters} from './mock-router';

export function HttpBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
  if(environment.mock_api){
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        for (let r of mockRouters.routers) {
          if (r.run(connection)) {
            return;
          }
        }

        // pass through any requests not handled above
        let realHttp = new Http(realBackend, options);
        let requestOptions = new RequestOptions({
          method: connection.request.method,
          headers: connection.request.headers,
          body: connection.request.getBody(),
          url: connection.request.url,
          withCredentials: connection.request.withCredentials,
          responseType: connection.request.responseType
        });
        realHttp.request(connection.request.url, requestOptions)
          .subscribe((response: Response) => {
              connection.mockRespond(response);
            },
            (error: any) => {
              connection.mockError(error);
            });

      }, mockRouters.timeout); //endof timeout
    });//endof subscribe

    return new Http(backend, options);//return Http Backend with mock api
  }
  else//mock_api false
  {
    return new Http(realBackend, options);
  }

};

export const HttpBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: HttpBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
