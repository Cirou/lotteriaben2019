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
import { Router } from "@angular/router";

@Component({
  selector: "app-profilepage",
  templateUrl: "./profilepage.component.html",
  styleUrls: ["./profilepage.component.css"]
})
export class ProfilepageComponent implements OnInit {

  somethingChanged = false;

  userProfile: User = new User;
  elencoGruppi: Group[] = new Array;
  elencoCibiUtente: Food[] = new Array;
  elencoCibiCompleto: Food[] = new Array;

  constructor(
    private rootService: RootService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit() {

    this.loader.showLoader(true);

    this.rootService.checkLoggedUser(this.router, this.userService);

    this.userProfile = this.rootService.loggedUser;

  }

  salvaModifiche() {
    this.userService.postUserProfile(this.userProfile).subscribe(
      user => {
        this.userProfile = user[0];
        this.rootService.loggedUser = user[0];
        console.log(user);
      },
      err => {
        console.log(err);
      });
  }

}


