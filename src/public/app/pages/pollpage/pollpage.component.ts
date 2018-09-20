import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { FoodService } from '../../services/food.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LocationDialogComponent } from "../../components/location-dialog/location-dialog.component";
import { Location } from "../../../../models/Location";

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
  elencoLocaliCompleto: any;
  locali: string;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private foodService: FoodService, public dialog: MatDialog) { }

  private elencoLocation: Location[] = new Array;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupDetails = this.groupService.getGroupDetails(this.id)
      .subscribe(
        groupDetails => {
          this.groupDetails = groupDetails;
          this.totaleMembri = groupDetails.users.length;
          console.log(this.groupDetails);

          this.pollOfTheDay = this.groupService.getPollOfTheDay(this.id)
            .subscribe(
              pollOfTheDay => {
                this.pollOfTheDay = pollOfTheDay;
                for (let i = 0; i < this.pollOfTheDay.location.length; i++) {
                  this.pollOfTheDay.location[i].percentVoti = (100 / this.totaleMembri) * this.pollOfTheDay.location[i].voti;
                }
                console.log(this.pollOfTheDay);
              },
              err => {
                console.log(err);
              });

        },
        err => {
          console.log(err);
        });

    this.elencoLocaliCompleto = this.foodService.getFoodPlaces()
      .subscribe(
        elencoLocaliCompleto => {
          this.elencoLocaliCompleto = elencoLocaliCompleto;
          console.log(this.elencoLocaliCompleto);
        },
        err => {
          console.log(err);
        });
  }

   openDialog(): void {
      const dialogRef = this.dialog.open(LocationDialogComponent, {
       height: '70%',
       data: {
          elencoCompleto: this.elencoLocaliCompleto
        } 
      }); 

      dialogRef.afterClosed().subscribe(result => {
        if (result !== null && result !== undefined) {
          let selectedLocali = result[0].nome;
          const listSelected: string[] = new Array;
          listSelected.push(result[0].id);
          for (let i = 1; i < result.length; i++) {
            selectedLocali = selectedLocali + "," + result[i].nome;
            listSelected.push(result[i].id);
           }
           this.locali = selectedLocali;
           this.elencoLocaliCompleto = listSelected;
        }
        console.log("The dialog was closed");

      });
    }
  }  