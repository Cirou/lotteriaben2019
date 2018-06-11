import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Cibo } from "../../../../models/Cibo";

@Component({
  selector: "app-cibi-dialog",
  templateUrl: "./cibi-dialog.component.html",
  styleUrls: ["./cibi-dialog.component.css"]
})
export class CibiDialogComponent implements OnInit {

  dataSelected: Cibo[] = new Array;
  /*private cibiSelected = {
    selectedCibi : ""
  };*/
  constructor(
    public dialogRef: MatDialogRef<CibiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAreaListControlChanged(list: any) {
    this.dataSelected = list.selectedOptions.selected.map((item: any) => item.value);
  }

  /*recuperaLista() {
    let selectedCibi = this.dataSelected[0].nome;
    for (let i = 1; i < this.dataSelected.length; i++) {
          selectedCibi = selectedCibi + "," + this.dataSelected[i].nome;
    }
    this.cibiSelected.selectedCibi = selectedCibi;
  }*/

  ngOnInit() {
    for (let i = 0 ; i < this.data.elencoCompleto.length; i++) {
        for (let j = 0 ; j < this.data.cibi.length; j++) {
          if (this.data.cibi[j] === this.data.elencoCompleto[i].id) {
            this.data.elencoCompleto[i].selected = true;
            break;
          }
        }
    }

  }

}
