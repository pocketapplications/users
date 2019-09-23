import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url: string = environment.baseRESUrl + 'users';
    return this.http.get<User[]>(url);
  }

  createUser(user: User) {
    const url: string = environment.baseRESUrl + 'users';

    return this.http.post(url, user, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  editUser(user: User) {
    const url: string = environment.baseRESUrl + 'users/' + user.id;

    return this.http.put(url, user, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  deleteUsers(ids: number[]) {
    const url: string = environment.baseRESUrl + 'users:delete';
    let payload: string = '';
    ids.forEach((id) => { payload += 'id=' + id + '&' })

    return this.http.post(url, payload, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });

  }
}
