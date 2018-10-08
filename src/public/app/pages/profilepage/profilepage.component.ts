import { Component, OnInit, Inject, AfterContentInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../../models/User";
import { Group } from "../../../models/Group";
import { GroupService } from "../../services/group.service";
import { Food } from "../../../models/Food";
import { FoodService } from "../../services/food.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CibiDialogComponent } from "../../components/cibi-dialog/cibi-dialog.component";
import { LoaderService } from "../../services/loader.service";
import { RootService } from "../../services/root.service";

@Component({
  selector: "app-profilepage",
  templateUrl: "./profilepage.component.html",
  styleUrls: ["./profilepage.component.css"]
})
export class ProfilepageComponent implements OnInit, AfterContentInit {

  gruppi = "";
  cibi = "";
  disabledField = "true";

  userProfile: User = new User;
  elencoGruppi: Group[] = new Array;
  elencoCibiUtente: Food[] = new Array;
  elencoCibiCompleto: Food[] = new Array;

  constructor(private userService: UserService, 
    private groupService: GroupService, 
    private foodService: FoodService, 
    private rootService: RootService, 
    public dialog: MatDialog, 
    private loader: LoaderService) { }

  ngOnInit() {
    // this.user = UserService.getUserProfile(userId);
    this.loader.showLoader(true);
    this.foodService.getFoodList().subscribe(foodList => this.elencoCibiCompleto = foodList);

    this.userProfile = this.rootService.loggedUser;

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
          elencoCompleto: this.elencoCibiCompleto,
          cibi: this.userProfile.foods
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== null && result !== undefined) {
          let selectedCibi = result[0].nome;
          const listSelected: string[] = new Array;
          listSelected.push(result[0].id);
          for (let i = 1; i < result.length; i++) {
            selectedCibi = selectedCibi + "," + result[i].nome;
            listSelected.push(result[i].id);
          }
          this.cibi = selectedCibi;
          //this.userProfile.foods = listSelected;
        }
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


