import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers() {
    let users: User[] = [
      new User(1, 'm1@mail.bg', 'Nikolay', 'Nikolov', 0),
      new User(2, 'm2@mail.bg', 'Peter', 'Petrov', 1),
      new User(3, 'm3@mail.bg', 'Dimka', 'Cankova', 2)
    ];

    return users;
  }
}
