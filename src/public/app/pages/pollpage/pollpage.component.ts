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

  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.pollOfTheDay = this.groupService.getPollOfTheDay(this.id)
    .subscribe(
      pollOfTheDay => {
        this.pollOfTheDay = pollOfTheDay;
        ;
        console.log(this.pollOfTheDay);
      },
      err => {
        console.log(err);
      });
  }

}