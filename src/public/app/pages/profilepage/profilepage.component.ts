import { Component, OnInit, Inject, AfterContentInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../../../models/User";
import { Gruppo } from "../../../../models/Gruppo";
import { GroupService } from "../../services/group.service";
import { Cibo } from "../../../../models/Cibo";
import { FoodService } from "../../services/food.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CibiDialogComponent } from "../../components/cibi-dialog/cibi-dialog.component";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "app-profilepage",
  templateUrl: "./profilepage.component.html",
  styleUrls: ["./profilepage.component.css"]
})
export class ProfilepageComponent implements OnInit, AfterContentInit {
  // private user  = {
  //     "id": 1,
  //     "username": "luisa",
  //     "email": "luisa.somma@accenture.com",
  //     "nome": "luisa",
  //     "cognome": "somma",
  //     "img": "",
  //     "elencoGruppi": [
  //       {
  //         "id": 1,
  //         "nome": "fuoriorario",
  //         "descrizione": "Fuori Orario",
  //         "routerLink" : "fuoriorario"
  //       },
  //       {
  //         "id": 2,
  //         "nome": "genialloyd",
  //         "descrizione": "Genialloyd",
  //         "routerLink" : "genialloyd"
  //       }
  //     ],
  //     "elencoCibi" : [
  //       {
  //         "id": 1,
  //         "nome": "Pizza"
  //       },
  //       {
  //         "id": 2,
  //         "nome": "carne"
  //       }
  //     ]
  //   };
  private gruppi = "";
  private cibi = "";
  public disabledField = "true";

  constructor(private userService: UserService, private groupService: GroupService, private foodService: FoodService, public dialog: MatDialog, private loader: LoaderService) { }

  private userProfile: User = new User;
  private elencoGruppi: Gruppo[] = new Array;
  private elencoCibiUtente: Cibo[] = new Array;
  private elencoCibiCompleto: Cibo[] = new Array;

  ngOnInit() {
    // this.user = UserService.getUserProfile(userId);
    this.loader.showLoader(true);
    this.foodService.getFoodList().subscribe(foodList => this.elencoCibiCompleto = foodList);
    this.userService.getUserProfile()
      .subscribe(
        userInfo => {
          this.userProfile = userInfo;
          this.userProfile.elencoGruppi.forEach(element => {
            this.groupService.getGroupDetails(element).subscribe(
              groupInfo => {
                this.elencoGruppi.push(groupInfo);
                if (this.gruppi === "") {
                  this.gruppi = groupInfo.nome;
                } else {
                  this.gruppi = this.gruppi + "," + groupInfo.nome;
                }
              }
            );
          });
          this.userProfile.elencoCibi.forEach(element => {
            this.foodService.getFoodDetails(element).subscribe(
              foodInfo => {
                this.elencoCibiUtente.push(foodInfo);
                if (this.cibi === "") {
                  this.cibi = foodInfo.nome;
                } else {
                  this.cibi = this.cibi + "," + foodInfo.nome;
                }
              }
            );
          });
          console.log(this.userProfile);
          /*if (this.elencoGruppi !== null && this.elencoGruppi !== undefined && this.elencoGruppi.length > 0) {
            this.gruppi = this.elencoGruppi[0].nome;
           for (let i = 1; i < this.elencoGruppi.length; i++) {
             this.gruppi = this.gruppi + "," + this.elencoGruppi[i].nome;
           }
          }*/
          /*if (this.user.elencoGruppi !== null && this.user.elencoGruppi !== undefined && this.user.elencoGruppi.length > 0) {
            this.gruppi = this.user.elencoGruppi[0].nome;
           for (let i = 1; i < this.user.elencoGruppi.length; i++) {
             this.gruppi = this.gruppi + "," + this.user.elencoGruppi[i].nome;
           }
          }*/

          /*if (this.user.elencoCibi !== null && this.user.elencoCibi !== undefined && this.user.elencoCibi.length > 0) {
           this.cibi = this.user.elencoCibi[0].nome;
          for (let i = 1; i < this.user.elencoCibi.length; i++) {
            this.cibi = this.cibi + "," + this.user.elencoCibi[i].nome;
           }
          }*/
        },
        err => {
          console.log(err);
        });
  }

  onSubmit() {
    if (this.disabledField === "true") {
      this.disabledField = "false";
    } else {
      this.disabledField = "true";
    }

  }

  salvaModifiche() {
    this.disabledField = "true";
    // tdb
    // UserService.postUserProfile(user)
  }

  openDialog(): void {
    if (this.disabledField === "false") {
      const dialogRef = this.dialog.open(CibiDialogComponent, {
        height: "400px",
        width: "600px",
        data: {
          animal: "panda",
          elencoCompleto: this.elencoCibiCompleto
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        let selectedCibi = result[0].nome;
        const listSelected: string[] = new Array;
        listSelected.push(result[0].id);
        for (let i = 1; i < result.length; i++) {
          selectedCibi = selectedCibi + "," + result[i].nome;
          listSelected.push(result[i].id);
         }
         this.cibi = selectedCibi;
         this.userProfile.elencoCibi = listSelected;
        console.log("The dialog was closed");

      });
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.loader.showLoader(false);
    }, 5000);
  }
}


