import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserTip } from "../../../../models/UserTip";

@Component({
  selector: 'app-tip-dialog',
  templateUrl: './tip-dialog.component.html',
  styleUrls: ['./tip-dialog.component.css']
})
export class TipDialogComponent implements OnInit {

  tip: UserTip = new UserTip;

  constructor(
    public dialogRef: MatDialogRef<TipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.tip = this.data.tip;
    console.log(this.tip)
  }

}
