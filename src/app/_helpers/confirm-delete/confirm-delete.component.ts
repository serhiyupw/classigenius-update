import { Component, OnInit, Injectable } from '@angular/core';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteComponent implements OnInit {
 
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  displayDeleteConfirmationMessege()
  {
    const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
     
    return dialogRef.afterClosed();
  }

}
