import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-pollpage',
  templateUrl: './pollpage.component.html',
  styleUrls: ['./pollpage.component.css']
})
export class PollpageComponent implements OnInit {

  id: string;
  private sub: any;
  pollOfTheDay: any;
  groupDetails: any;
  totaleMembri: number;

  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupDetails = this.groupService.getGroupDetails(this.id)
    .subscribe(
      groupDetails => {
        this.groupDetails = groupDetails;
        this.totaleMembri = groupDetails.membri.length;
        console.log(this.groupDetails);

        this.pollOfTheDay = this.groupService.getPollOfTheDay(this.id)
        .subscribe(
          pollOfTheDay => {
            this.pollOfTheDay = pollOfTheDay;
            for (let i = 0; i < this.pollOfTheDay.location.length; i++) {
              this.pollOfTheDay.location[i].percentVoti = (100/this.totaleMembri)*this.pollOfTheDay.location[i].voti;
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

  }

}