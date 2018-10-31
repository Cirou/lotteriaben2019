import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Group } from '../../../models/Group';
import { FormControl, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { VotationService } from '../../services/votation.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';
import { Votation } from '../../../models/Votation';
import { Food } from '../../../models/Food';
import { formatDateTimezone } from '../../../../shared/utils/DateUtils';
import { MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import * as d3 from 'd3';


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

  chart: any;
  month_name: any;
  user_count: any;


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

          this.userList.forEach(user => {
            this.votationService.getVotationByDate(user.id, formatDateTimezone(this.dataSelezionata)).subscribe(
              votations => {

                user.foods = new Array;

                votations.forEach(element => {
                  user.foods.push(element.food_id);
                });

                console.log(user.foods);
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

    var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d");

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = canvas.width - margin.left - margin.right,
      height = canvas.height - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    context.translate(margin.left, margin.top);

    d3.tsv("/public/assets/mock/data.tsv", function (d) {
      return d;
    }, function (error, data) {
      if (error) throw error;

      x.domain(data.map(function (d) { return d.letter; }));
      y.domain([0, Number(d3.max(data, function (d) { return d.frequency; }))]);

      var yTickCount = 10,
        yTicks = y.ticks(yTickCount),
        yTickFormat = y.tickFormat(yTickCount, "%");

      context.beginPath();
      x.domain().forEach(function (d) {
        context.moveTo(x(d) + x.bandwidth() / 2, height);
        context.lineTo(x(d) + x.bandwidth() / 2, height + 6);
      });
      context.strokeStyle = "black";
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
      context.strokeStyle = "black";
      context.stroke();

      context.textAlign = "right";
      context.textBaseline = "middle";
      yTicks.forEach(function (d) {
        context.fillText(yTickFormat(d), -9, y(d));
      });

      context.beginPath();
      context.moveTo(-6.5, 0 + 0.5);
      context.lineTo(0.5, 0 + 0.5);
      context.lineTo(0.5, height + 0.5);
      context.lineTo(-6.5, height + 0.5);
      context.strokeStyle = "black";
      context.stroke();

      context.save();
      context.rotate(-Math.PI / 2);
      context.textAlign = "right";
      context.textBaseline = "top";
      context.font = "bold 10px sans-serif";
      context.fillText("Frequency", -10, 10);
      context.restore();

      context.fillStyle = "steelblue";
      data.forEach(function (d) {
        context.fillRect(x(d.letter), y(Number(d.frequency)), x.bandwidth(), height - y(Number(d.frequency)));
      });
    });


  }



}
