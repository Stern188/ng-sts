import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ObservableInput } from "rxjs/Observable";
import { AppSettings } from "../app.settings";
import { Index } from './index';

@Injectable()
export class IndexService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private indexUrl = `${AppSettings.env_vars.API_URL}/index`;
    constructor(private http: Http) { }
    getIndex() {
        return this.http.get(this.indexUrl)
            .map(response => response.json() as Index[])
            .catch(this.handleError);
    }
    create(index: object) {
        return this.http
            .post(this.indexUrl, JSON.stringify(index), { headers: this.headers })
            .map(res => res.json() as Index)
            .catch(this.handleError);
    }
    findVByProId(id: number) {
        const url = `${this.indexUrl}/${id}`;
        return this.http.get(url, { headers: this.headers })
            .map(res => res.json() as Index)
            .catch(this.handleError);
    }
    findMem(proid: number, verid: number) {
        const url = `${this.indexUrl}/${proid}/${verid}`;
        return this.http.get(url, { headers: this.headers })
            .map(res => res.json() as Index)
            .catch(this.handleError);
    }
    public handleError(error, caught): ObservableInput<any> {
        return Observable.throw(error);
    }
}