import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppSettings } from "../app.settings";
import { Projects } from './projects';

@Injectable()
export class ProjectsService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private projectsUrl = `${AppSettings.env_vars.API_URL}/projects`;
    constructor(private http: Http) { }
    getProjects(): Promise<Projects[]> {
        return this.http.get(this.projectsUrl)
            .toPromise()
            .then(response => response.json() as Projects[])
            .catch(this.handleError);
    }
    create(project: object): Promise<Projects> {
        return this.http
            .post(this.projectsUrl, JSON.stringify(project), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Projects)
            .catch(this.handleError);
    }
    update(project: Projects): Promise<Projects> {
        const url = `${this.projectsUrl}/${project.id}`;
        return this.http
            .put(url, JSON.stringify(project), { headers: this.headers })
            .toPromise()
            .then(() => project)
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.projectsUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}