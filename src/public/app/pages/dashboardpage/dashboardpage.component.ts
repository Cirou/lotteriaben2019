import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Group } from '../../../models/Group';
import { GroupService } from '../../services/group.service';
import { VotationService } from '../../services/votation.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';
import { Votation } from '../../../models/Votation';
import { formatDateTimezone } from '../../../../shared/utils/DateUtils';
import { MAT_DATE_LOCALE } from '@angular/material';
import * as d3 from 'd3';
import { any } from 'async';


@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
  ]
})
export class DashboardpageComponent implements OnInit {

  private sub: any;
  groupList: Group[];
  groupDetails: any;
  userList: User[];
  numeroMembri: number;
  dataSelezionata: Date;
  gruppoSelezionato: number;
  votationsUserList: Votation[];
  firstClick: boolean = true;
  foodList = new Array;
  foodListCopy = new Array;

  constructor(private groupService: GroupService,
    private votationService: VotationService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.groupService.getAllGroups().subscribe(
      groups => {
        this.groupList = groups;
      },
      err => {
        console.log(err);
      });


  }

  openGroup() {


    this.groupDetails = this.groupService.getGroupDetails(this.gruppoSelezionato)
      .subscribe(
        groupDetails => {

          this.userList = groupDetails[0].users;
          this.foodListCopy = this.foodList;

          this.userList.forEach(user => {
            this.votationService.getVotationByDate(user.id, formatDateTimezone(this.dataSelezionata)).subscribe(
              votations => {

                user.foods = new Array;
                var count = 0;

                votations.forEach(vote => {

                  user.foods.push(vote.food_id);

                      let found = this.foodListCopy.find(item => item.id === vote.food_id.id);

                       if (found != null) {
                        this.foodListCopy[vote.food_id.id-1].selezioni++;
                     } else {
                         vote.food_id.selezioni = 1;
                         this.foodListCopy.push(vote.food_id);
                     }
                });
                console.log(user.foods);
                console.log(this.foodListCopy);
              },
              err => {
                console.log(err);
              });
          });

          this.showGraph();
          console.log(this.userList);
        },
        err => {
          console.log(err);
        });
  }


  showGraph() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");

    const margin = { top: 20, right: 20, bottom: 80, left: 80 };
    const width = canvas.width - margin.left - margin.right;
    const height = canvas.height - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var colors = ["#0F52BA", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#FFD800", "#C71585"];

    if (!this.firstClick) {
      context.translate(-margin.left, -margin.top);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    context.translate(margin.left, margin.top);
    this.firstClick = false;

    d3.tsv('/groupsuggestiontsv/' + this.gruppoSelezionato + '/' + formatDateTimezone(this.dataSelezionata), function (d) {
      // d3.tsv("/public/assets/mock/grafic.tsv", function (d) {
      return d;
    }, function (error, data) {
      if (error) throw error;


      x.domain(data.map(function (d) { return d.letter; }));
      y.domain([0, 100]);

      var yTickCount = 10,
        yTicks = y.ticks(yTickCount),
        yTickFormat = y.tickFormat(yTickCount);

      context.beginPath();
      x.domain().forEach(function (d) {
        context.moveTo(x(d) + x.bandwidth() / 2, height);
        context.lineTo(x(d) + x.bandwidth() / 2, height + 6);
      });
      context.strokeStyle = "#000000";
      context.font = "bold 12px sans-serif";
      context.stroke();

      context.textAlign = "center";
      context.textBaseline = "top";
      x.domain().forEach(function (d) {
        context.fillText(d, x(d) + x.bandwidth() / 2, height + 6);
      });

      context.beginPath();
      yTicks.forEach(function (d) {
        context.moveTo(0, y(d) + 0.5);
        context.lineTo(-6, y(d) + 0.5);
      });
      context.stroke();

      context.textAlign = "right";
      context.textBaseline = "middle";
      yTicks.forEach(function (d) {
        context.fillText(yTickFormat(d), -9, y(d));
      });

      context.beginPath();
      context.moveTo(-1, 0 + 0.5);
      context.lineTo(0.5, 0 + 0.5);
      context.lineTo(0.5, height + 0.5);
      context.lineTo(-1, height + 0.5);
      context.stroke();

      context.save();
      context.rotate(-Math.PI / 2);
      context.textAlign = "right";
      context.textBaseline = "top";
      context.fillText("Compatibilità", -150, -50);
      context.restore();

      context.fillText("Ristoranti", 450, 330);

      for (let index = 0; index < data.length; index++) {
        const d = data[index];
        context.fillStyle = colors[index];
        context.fillRect(x(d.letter), y(Number(d.frequency)), x.bandwidth(), height - y(Number(d.frequency)));
        context.fillStyle = "#000000";
        context.fill();

      }

    });


  }



}
