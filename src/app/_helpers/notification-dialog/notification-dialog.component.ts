import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class NotificationDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayNotificationMessege(title: string , message: string,confirmButton: string,dismissButton:string )
  {
   
    const dialogData = new ConfirmDialogModel(title, message, confirmButton,dismissButton);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
     
    return dialogRef.afterClosed();
  }

}
