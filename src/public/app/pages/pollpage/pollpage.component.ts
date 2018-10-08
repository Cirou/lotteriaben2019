import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Suggestion } from '../../../models/Suggestion';

@Component({
  selector: 'app-pollpage',
  templateUrl: './pollpage.component.html',
  styleUrls: ['./pollpage.component.css']
})
export class PollpageComponent implements OnInit {

  id: number;
  sub: any;
  pollOfTheDay: any;
  groupDetails: any;
  totaleMembri: number;
  suggestion: Suggestion;
  hasSuggestion: boolean = false;

  constructor(private route: ActivatedRoute,
    private groupService: GroupService) { }

  ngOnInit() {

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

    this.groupService.getSuggestion(this.id).subscribe(
      suggestion => {
        if(suggestion && suggestion[0]){
          this.hasSuggestion = true;
          this.suggestion = suggestion[0];
        }
        console.log(this.suggestion);
      },
      err => {
        console.log(err);
      });

  }

}  