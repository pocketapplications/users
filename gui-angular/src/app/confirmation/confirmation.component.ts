import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

export class ConfirmationData {

  constructor(public title: string, public message: string) { }
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationData) { }

  ngOnInit() {
  }

}
