import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/User';
import { Tip } from '../../../models/Tip';
import { Group } from '../../../models/Group';
import { GroupService } from '../../services/group.service';
import { LoaderService } from '../../services/loader.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipDialogComponent } from '../../components/tip-dialog/tip-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { RootService } from '../../services/root.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groupspage',
  templateUrl: './groupspage.component.html',
  styleUrls: ['./groupspage.component.css']
})
export class GroupspageComponent implements OnInit {

  @Output() showLoader = new EventEmitter<boolean>();

  constructor(private userService: UserService,
    private groupService: GroupService,
    private loader: LoaderService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private rootService: RootService,
    private router: Router) { }

  user: User = new User;
  elencoGruppi: Group[] = new Array;
  tip: Tip = new Tip;
  tipMaxId: number = 1;
  alreadyVoted: boolean = false;

  ngOnInit() {

    this.loader.showLoader(true);

    this.rootService.checkLoggedUser(this.router, this.userService);

    this.userService.getUserProfile(this.rootService.loggedUserId)
      .subscribe(
        userInfo => {
          this.user = userInfo[0];
          this.rootService.loggedUser = userInfo[0];
          console.log(this.user);
        },
        err => {
          console.log(err);
        }
      );

    this.userService.getUserVotation(this.rootService.loggedUserId)
      .subscribe(
        votations => {
          if (votations.length > 0) {
            this.alreadyVoted = true;
            this.rootService.votations = votations;
          }
          console.log(votations);
        },
        err => {
          console.log(err);
        });


    this.userService.getTipMaxId()
      .subscribe(
        tipMaxId => {
          this.tipMaxId = Number(tipMaxId.id);
          const randId = String(Math.floor(Math.random() * this.tipMaxId - 1) + 1);
          console.log(this.tipMaxId);
          console.log(randId);

          this.userService.getUserLoginTip(randId)
            .subscribe(
              tip => {
                this.tip = tip[0];
                console.log(this.tip);
                if (this.tip.id != null && this.cookieService.get('pausappranzo_daily_login_done') != 'true') {
                  this.openTipPopup();
                }
              },
              err => {
                console.log(err);
              }
            );
        }
      );

  }

  ngAfterContentInit() {
    this.loader.showLoader(false);
  }

  openTipPopup() {
    this.cookieService.set('pausappranzo_daily_login_done', 'true', 1);
    const dialogRef = this.dialog.open(TipDialogComponent, {
      height: "80%",
      width: "600px",
      data: {
        tip: this.tip
      }
    });
  }



}
