import { Component, OnInit } from '@angular/core';
import { Group } from '../../../models/Group';
import { FormControl, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';



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

  constructor( private groupService: GroupService,
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
          console.log(this.userList);
        },
        err => {
          console.log(err);
        });
  }

}
