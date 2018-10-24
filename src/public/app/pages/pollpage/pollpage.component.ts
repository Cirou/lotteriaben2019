import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { MatDialog } from "@angular/material";
import { UserService } from '../../services/user.service';
import { RootService } from '../../services/root.service';
import { Group } from '../../../models/Group';

@Component({
  selector: 'app-pollpage',
  templateUrl: './pollpage.component.html',
  styleUrls: ['./pollpage.component.css']
})
export class PollpageComponent implements OnInit {

  id: number;
  sub: any;
  pollOfTheDay: any;
  groupDetails: Group = new Group;
  totaleMembri: number;
  hasSuggestion: boolean = false;

  constructor(private route: ActivatedRoute,
    private groupService: GroupService,
    private rootService: RootService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }


  ngOnInit() {

    this.rootService.checkLoggedUser(this.router, this.userService);

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupService.getGroupDetails(this.id)
      .subscribe(
        groupDetails => {
          this.groupDetails = groupDetails[0];
          this.totaleMembri = groupDetails[0].users.length;
          console.log(this.groupDetails);
        },
        err => {
          console.log(err);
        });

  }

}  