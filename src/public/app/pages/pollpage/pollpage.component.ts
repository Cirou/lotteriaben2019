import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { FoodService } from '../../services/food.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LocationDialogComponent } from "../../components/location-dialog/location-dialog.component";
import { Location } from "../../../models/Location";
import { Food } from '../../../models/Food';

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

  constructor(private route: ActivatedRoute, private groupService: GroupService, private foodService: FoodService, public dialog: MatDialog) { }

  private elencoCibi: Food[] = new Array;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupDetails = this.groupService.getGroupDetails(this.id)
      .subscribe(
        groupDetails => {
          this.groupDetails = groupDetails;
          Promise.resolve(groupDetails.users).then(users => {
            this.totaleMembri = users.length;
          });
          console.log(this.groupDetails);


        },
        err => {
          console.log(err);
        });

    this.foodService.getFoodList().subscribe(cibi =>{

      this.elencoCibi = cibi;

    });
  }

  }  