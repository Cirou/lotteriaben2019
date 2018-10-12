import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-groupdialog',
  templateUrl: './groupdialog.component.html',
  styleUrls: ['./groupdialog.component.css']
})
export class GroupdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GroupdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  remove(userid:number) {
    
  }

}
