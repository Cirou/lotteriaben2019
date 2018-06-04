import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Location } from "../../../../models/Location";

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {

  private dataSelected: Location[] = new Array;

  constructor( public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onAreaListControlChanged(list: any) {
      this.dataSelected = list.selectedOptions.selected.map((item: any) => item.value);
    }


  ngOnInit() {
  }

}
