import { ConfirmDeleteComponent } from '../_helpers/confirm-delete/confirm-delete.component';
import { SegmentService } from '../_services/segment.service';
import { Component, OnInit } from '@angular/core';
import { iSegment } from './iSegment';
//import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.css']
})
export class SegmentsComponent implements OnInit {
 
  segments: iSegment[];


  segmenttypes = [
    { id: 1, name: 'Amazon' },
    { id: 2, name: 'Local' },
 ]

  constructor(private service: SegmentService,  public confirmDelete: ConfirmDeleteComponent) {
  }

  ngOnInit() {
 
    this.service.getAll()
      .subscribe(
        response => {
          this.segments =<iSegment[]> response;
   //       console.log(this.segments);
        },
        error => {
          alert('Error');
          console.log('error');
        })

  }
  SegmentType(segmentTypeId : number)
  {
    let segmentType ="";
  
    this.segmenttypes.forEach(element => {
   
      if (element.id == segmentTypeId)
      {
     
        segmentType = element.name;
      }
      
    });
   
    return segmentType;
  }


   deleteSegment(segment: iSegment) {

    this.confirmDelete.displayDeleteConfirmationMessege()
   //  this.displayDeleteConfirmationMessege()
        .subscribe(dialogResult => {
   
      if (dialogResult) {
    //    this.service.deleteSegment(segment.segmentid)
        this.service.delete(segment.segmentid)
          .subscribe(response => {
            let index = this.segments.indexOf(segment);
            this.segments.splice(index, 1);
          },
            error => {
              alert('Error');
              console.log('error');
            })
      }
    });
  }
   
}
