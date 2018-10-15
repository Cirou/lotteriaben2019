import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { FoodService } from '../../services/food.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LocationDialogComponent } from "../../components/location-dialog/location-dialog.component";
import { Location } from "../../../models/Location";
import { Food } from '../../../models/Food';
import { UserService } from '../../services/user.service';
import { RootService } from '../../services/root.service';

@Component({
  selector: 'app-pollpage',
  templateUrl: './pollpage.component.html',
  styleUrls: ['./pollpage.component.css']
})
export class PollpageComponent implements OnInit {

  id: number;
  private sub: any;
  pollOfTheDay: any;
  groupDetails: any;
  totaleMembri: number;
  hasSuggestion: boolean = false;

  constructor(private route: ActivatedRoute,
    private groupService: GroupService,
    private foodService: FoodService,
    private rootService: RootService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

  private elencoCibi: Food[] = new Array;

  ngOnInit() {

    this.rootService.checkLoggedUser(this.router, this.userService);

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupDetails = this.groupService.getGroupDetails(this.id)
      .subscribe(
        groupDetails => {
          this.groupDetails = groupDetails;
          this.totaleMembri = groupDetails.users.length;
          console.log(this.groupDetails);
        },
        err => {
          console.log(err);
        });

    this.foodService.getFoodList().subscribe(cibi => {
      this.elencoCibi = cibi;
      console.log(this.elencoCibi);
    },
      err => {
        console.log(err);
      });
  }

}  