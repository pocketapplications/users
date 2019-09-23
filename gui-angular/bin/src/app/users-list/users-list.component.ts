import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  sortColumnName: string;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dateOfBirth'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(protected userService: UsersService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userService.getUsers());
    this.dataSource.sort = this.sort;
  }

}
