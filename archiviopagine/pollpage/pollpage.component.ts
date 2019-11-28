import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { MatDialog } from "@angular/material";
import { UserService } from '../../services/user.service';
import { RootService } from '../../services/root.service';
import { Group } from '../../../models/Group';
import { formatDate } from '../../../../shared/utils/DateUtils';
import { GroupSuggestion } from '../../../models/GroupSuggestion';

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
  suggestions: GroupSuggestion[];
  firstSuggestion: GroupSuggestion;
  secondSuggestion: GroupSuggestion;
  thirdSuggestion: GroupSuggestion;

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

          this.groupService.getSuggestionByDate(groupDetails[0].id, formatDate(new Date)).subscribe(suggestions => {

            this.suggestions = suggestions;

            if (this.suggestions.length > 0) {
              this.firstSuggestion = this.suggestions[0];
              this.secondSuggestion = this.suggestions[1];
              this.thirdSuggestion = this.suggestions[2];

              if (this.firstSuggestion.rating > 0) {
                this.hasSuggestion = true;
              }

            }

          });

        },
        err => {
          console.log(err);
        });

  }

}  