import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ConfirmMessageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  displayConfirmationMessege(message: string) {
    // const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirmation", message,"OK","");
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    return dialogRef.afterClosed();
  }

  displayErrorMessege(message: string) {
    // const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Error", message,"OK","");
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    return dialogRef.afterClosed();
  }
}
