import { Component, OnInit } from '@angular/core';
import { Group } from '../../../models/Group';
import { FormControl, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';
import * as d3 from 'd3';


@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit {

  private sub: any;
  groupList: Group[];
  groupDetails: any;
  userList: User[];
  numeroMembri: number;
  dataSelezionata: Date;
  gruppoSelezionato: number;

  constructor(private groupService: GroupService,
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
          this.showGraph();
          console.log(this.userList);
        },
        err => {
          console.log(err);
        });
  }


  showGraph() {

    var data = [1, 1, 2, 3, 5, 8, 13];

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var width = 500,
      height = 500;

    var duration = 7500;

    var outerRadius = height / 2 - 30,
      innerRadius = outerRadius / 3,
      cornerRadius = 10;

    var pie = d3.pie();

    var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    var svg = d3.select('.graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var path = svg.selectAll('path')
      .data(data)
      .enter().append('path');

    var ease = d3.transition()
      .duration(duration)
      .transition()
      .ease(d3.easeCubic);

    d3.timer(function (elapsed) {

      if(elapsed == duration){
        return;
      }

      var t = 1 - Math.abs((elapsed % duration) / duration - .5) * 2;

      path.data(
          pie.padAngle(t * 2 * Math.PI / data.length)(data)
        )
        .style('fill', function (d, i) { return color(String(i)); })
        .attr('d', <any>arc);

    });
  }

}
