import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ConfirmationComponent, ConfirmationData } from '../confirmation/confirmation.component';
import { SelectionModel } from '@angular/cdk/collections';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public error: String;

  protected sortColumnName: string;
  protected dataSource: MatTableDataSource<User>;
  protected displayedColumns: string[] = ['select', 'firstName', 'lastName', 'email', 'dateOfBirth'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection: SelectionModel<number> = new SelectionModel<number>(true, []);

  constructor(protected userService: UsersService, protected dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;

    this.loadUsersData(false);
  }

  loadUsersData(initSelection: boolean) {
    this.userService.getUsers().pipe(retry(2)).subscribe(
      (users: User[]) => {
        this.dataSource.data = users;
        if (initSelection) {
          this.selection.clear();
        }

      }, 
      this.handleServerError.bind(this));
  }

  createUser(): void {
    this.displayUserDetails(new User());
  }

  editUser() {
    const id: number = this.selection.selected[0];
    const user: User = this.getUserById(id);
    this.displayUserDetails(new User(user.email, user.firstName, user.lastName, new Date(user.dateOfBirth).getTime(), user.id));
  }

  getUserById(id): User {
    return this.dataSource.data.filter((user) => user.id == id)[0];
  }

  displayUserDetails(user) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.loadUsersData(false);
      }
    });
  }


  deleteUsers(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '600px',
      data: new ConfirmationData('Delete Confirmation', 'Do wou want to delete selected users?')
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        const ids: number[] = this.selection.selected;
        this.userService.deleteUsers(ids).subscribe(
          () => {
            this.loadUsersData(true);
          }, this.handleServerError.bind(this)
        );
      }
    });
  }

  handleServerError() {
    this.error = "There is some server problem, please try again later.";
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row.id));
  }

}
