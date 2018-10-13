import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Message } from '../../../models/Message';
import { LoaderService } from '../../services/loader.service';
import { MatDialog } from '@angular/material';
import { GroupdialogComponent } from '../../components/groupdialog/groupdialog.component';
import { RootService } from '../../services/root.service';

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
  oldGroupMessages: Message[];
  numeroMembri: number;
  chatTimer: NodeJS.Timer;


  constructor(private route: ActivatedRoute,
    private groupService: GroupService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private rootService: RootService,
    private router: Router) { }

  ngOnInit() {

    this.loader.showLoader(true);

    this.groupMessages = new Array;
    this.oldGroupMessages = new Array;

    if (!this.rootService.loggedUserId) {
      this.router.navigate(['/login']);
      return;
    }

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

    this.loadMessages();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    clearTimeout(this.chatTimer);
  }

  ngAfterContentInit() {
    this.loader.showLoader(false);

    this.chatTimer = setInterval(() => {
      this.loadMessages();
    }, 1 * 1000);

  }

  openGroup() {
    const dialogRef = this.dialog.open(GroupdialogComponent, {
      height: '80%',
      width: '600px',
      data: {
        groupDetails: this.groupDetails
      }
    });
  }

  loadMessages() {

    this.groupService.getGroupMessages(this.id)
      .subscribe(
        loadedMessages => {
          if (loadedMessages.length > this.groupMessages.length) {
            console.log('nuovi messaggi');
            this.groupMessages = loadedMessages;
          }
          console.log(this.groupMessages);
        },
        err => {
          console.log(err);
        });

  }

} 
