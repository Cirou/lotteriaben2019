import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Message } from '../../../models/Message';
import { LoaderService } from '../../services/loader.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-groupdetailpage',
  templateUrl: './groupdetailpage.component.html',
  styleUrls: ['./groupdetailpage.component.css']
})
export class GroupdetailpageComponent implements OnInit, AfterContentInit {

  id: number;
  private sub: any;
  groupDetails: any;
  groupMessages: Message[];
  numeroMembri: number;
  chatTimer: NodeJS.Timer;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private loader: LoaderService) { }

  ngOnInit() {

    this.loader.showLoader(true);

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupDetails = this.groupService.getGroupDetails(this.id)
      .subscribe(
        groupDetails => {
          this.groupDetails = groupDetails[0];
          this.numeroMembri = groupDetails[0].users.length;
          console.log(this.groupDetails);
        },
        err => {
          console.log(err);
        });

    this.groupService.getGroupMessages(this.id)
      .subscribe(
        groupMessages => {
          this.groupMessages = groupMessages;
          console.log(this.groupMessages);
        },
        err => {
          console.log(err);
        });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    clearTimeout(this.chatTimer);
  }

  ngAfterContentInit() {
    this.loader.showLoader(false);

    this.chatTimer = setInterval(() => {
      this.groupService.getGroupMessages(this.id)
        .subscribe(
          groupMessages => {
            this.groupMessages = groupMessages;
          },
          err => {
          });
    }, 1 * 1000);

  }

}
