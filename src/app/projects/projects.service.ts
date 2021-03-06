import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ObservableInput } from "rxjs/Observable";
import { AppSettings } from "../app.settings";
import { Projects } from './projects';

@Injectable()
export class ProjectsService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = `${AppSettings.env_vars.API_URL}/projects`;
    constructor(private http: Http) { }
    getProjects() {
        return this.http.get(this.url)
            .map(response => {
                return response.json() as Projects[];
            })
            .catch(this.handleError);
    }
    create(project: object) {
        return this.http
            .post(this.url, JSON.stringify(project), { headers: this.headers })
            .map(res => res.json() as Projects)
            .catch(this.handleError);
    }
    update(project: Projects) {
        const updurl = `${this.url}/${project.id}`;
        return this.http
            .put(updurl, JSON.stringify(project), { headers: this.headers })
            .map(() => project)
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