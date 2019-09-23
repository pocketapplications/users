import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { User } from '../user';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const NAME_LENGTH: number = 50;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userDetailsForm: FormGroup;
  public error: String;

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, public dialogRef: MatDialogRef<UserDetailsComponent, User>, private userService: UsersService) {
  }

  ngOnInit() {
    this.userDetailsForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.maxLength(NAME_LENGTH)]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.maxLength(NAME_LENGTH)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(this.user.dateOfBirth != null ? new Date(this.user.dateOfBirth) : null, [Validators.required])
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  getUserDetails(formData: any) {
    return new User(formData.email, formData.firstName, formData.lastName, new Date(formData.dateOfBirth).getTime(), this.user.id);
  }

  saveUser() {
    const user: User = this.getUserDetails(this.userDetailsForm.value);
    var observable: Observable<any>;
    if (this.user.id == null) {
      observable = this.userService.createUser(user);
    } else {
      observable = this.userService.editUser(user);
    }

    observable.subscribe(() => {
      this.dialogRef.close(user);
    }, () => { this.error = "There is some server problem, please try again later." });
  }

  isInvalid(controlName: string) {
    return this.userDetailsForm.controls[controlName].invalid;
  }

  getErrorMessage(controlName: string) {
    const formControl = this.userDetailsForm.controls[controlName];
    switch (controlName) {
      case 'firstName':
        return formControl.hasError('required') ? 'Please enter a name' : 'Name length should be $(NAME_LENGTH) chars'
        break;
      case 'lastName':
        return formControl.hasError('required') ? 'Please enter a surname' : 'Surname length should be $(NAME_LENGTH) chars'
        break;

      case 'email':
        return formControl.hasError('required') ? 'Please enter an email' : 'Please enter a valid email'
        break;
      case 'dateOfBirth':
        return 'Please enter a date of birth'
        break;
    }

    return ''
  }


}
