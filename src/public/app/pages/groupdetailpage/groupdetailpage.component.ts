import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Chat } from '../../../../models/Chat';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-groupdetailpage',
  templateUrl: './groupdetailpage.component.html',
  styleUrls: ['./groupdetailpage.component.css']
})
export class GroupdetailpageComponent implements OnInit, AfterContentInit {

  id: string;
  private sub: any;
  groupDetails: any;
  groupChat: Chat;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private loader: LoaderService) { }

  ngOnInit() {

    this.loader.showLoader(true);

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupDetails = this.groupService.getGroupDetails(this.id)
      .subscribe(
        groupDetails => {
          this.groupDetails = groupDetails;
          ;
          console.log(this.groupDetails);
        },
        err => {
          console.log(err);
        });

    this.groupService.getGroupChat(this.id)
      .subscribe(
        groupChat => {
          this.groupChat = groupChat;
          ;
          console.log(this.groupDetails);
        },
        err => {
          console.log(err);
        });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterContentInit(){
    this.loader.showLoader(false);
  }

}
