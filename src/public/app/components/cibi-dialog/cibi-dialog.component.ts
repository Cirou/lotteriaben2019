import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-cibi-dialog',
  templateUrl: './cibi-dialog.component.html',
  styleUrls: ['./cibi-dialog.component.css']
})
export class CibiDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CibiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
