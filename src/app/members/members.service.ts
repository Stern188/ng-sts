import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, ObservableInput } from "rxjs/Observable";
import { AppSettings } from "../app.settings";
import { Members } from './members';

@Injectable()
export class MembersService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private membersUrl = `${AppSettings.env_vars.API_URL}/members`;
    constructor(private http: Http) { }
    getMembers() {
        return this.http.get(this.membersUrl)
            .map(response => response.json() as Members[])
            .catch(this.handleError);
    }
    create(users: object) {
        return this.http
            .post(this.membersUrl, JSON.stringify(users), { headers: this.headers })
            .map(res => res.json() as Members)
            .catch(this.handleError);
    }
    update(member: Members) {
        const url = `${this.membersUrl}/${member.id}`;
        return this.http
            .put(url, JSON.stringify(member), { headers: this.headers })
            .map(() => member)
            .catch(this.handleError);
    }
    delete(id: number) {
        const url = `${this.membersUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .map(() => null)
            .catch(this.handleError);
    }
    public handleError(error, caught): ObservableInput<any> {
        return Observable.throw(error);
    }
}