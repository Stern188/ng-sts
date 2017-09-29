import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppSettings } from "../app.settings";
import { Members } from './members';

@Injectable()
export class MembersService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private membersUrl = `${AppSettings.env_vars.API_URL}/members`;
    constructor(private http: Http) { }
    getMembers(): Promise<Members[]> {
        return this.http.get(this.membersUrl)
            .toPromise()
            .then(response => response.json() as Members[])
            .catch(this.handleError);
    }
    create(users: object): Promise<Members> {
        return this.http
            .post(this.membersUrl, JSON.stringify(users), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Members)
            .catch(this.handleError);
    }
    update(member: Members): Promise<Members> {
        const url = `${this.membersUrl}/${member.id}`;
        return this.http
            .put(url, JSON.stringify(member), { headers: this.headers })
            .toPromise()
            .then(() => member)
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.membersUrl}/${id}`;
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