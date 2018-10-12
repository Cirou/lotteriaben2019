import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addmemberdialog',
  templateUrl: './addmemberdialog.component.html',
  styleUrls: ['./addmemberdialog.component.css']
})
export class AddmemberdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddmemberdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
