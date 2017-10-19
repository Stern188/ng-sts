import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppSettings } from "../app.settings";
import { Observable, ObservableInput } from "rxjs/Observable";
import { Versions } from './versions';

@Injectable()
export class VersionsService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = `${AppSettings.env_vars.API_URL}/versions`;
    constructor(private http: Http) { }
    getVersions() {
        return this.http.get(this.url)
            .map(response => {
                return response.json() as Versions[];
            })
            .catch(this.handleError);
    }
    create(versions: object) {
        return this.http.post(this.url, JSON.stringify(versions), { headers: this.headers })
            .map(response => {
                return response.json() as Versions[];
            })
            .catch(this.handleError);
    }
    update(versions: Versions) {
        const updurl = `${this.url}/${versions.id}`;
        return this.http.put(updurl, JSON.stringify(versions), { headers: this.headers })
            .map(response => {
                return response.json() as Versions[];
            })
            .catch(this.handleError);
    }
    delete(id: number) {
        const delurl = `${this.url}/${id}`;
        return this.http.delete(delurl, { headers: this.headers })
            .map(() => null)
            .catch(this.handleError);
    }
    public handleError(error, caught): ObservableInput<any> {
        return Observable.throw(error);
    }
}