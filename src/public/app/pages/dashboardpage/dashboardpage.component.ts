import { Component, OnInit } from '@angular/core';
import { Group } from '../../../models/Group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit {

  groupList: Group[];
  
  constructor( private groupService: GroupService,) { }

  ngOnInit() {

    this.groupService.getAllGroups().subscribe(
      groups => {
        this.groupList = groups;
      },
      err => {
        console.log(err);
      });
  }

}
