import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../models/User';
import { Tip } from '../../../../models/Tip';
import { Group } from '../../../../models/Group';
import { GroupService } from '../../services/group.service';
import { LoaderService } from '../../services/loader.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipDialogComponent } from '../../components/tip-dialog/tip-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-groupspage',
  templateUrl: './groupspage.component.html',
  styleUrls: ['./groupspage.component.css']
})
export class GroupspageComponent implements OnInit {

  @Output() showLoader = new EventEmitter<boolean>();

  constructor(private userService: UserService, private groupService: GroupService,  private loader: LoaderService, public dialog: MatDialog, private cookieService: CookieService) { }

  user:User = new User;
  elencoGruppi:Group[] = new Array;
  tip:Tip = new Tip;

  ngOnInit() {

    this.loader.showLoader(true);

    this.userService.getUserProfile()
    .subscribe(
      userInfo => {
        this.user = userInfo;
          this.groupService.getGroupDetails(this.user.id).subscribe(
            groupInfo => {
              this.elencoGruppi.push(groupInfo)
            }
          );
        ;
        console.log(this.user);
      },
      err => {
        console.log(err);
      });

      this.userService.getUserLoginTip()
      .subscribe(
        Tip => {
          this.tip = Tip;
          console.log(this.tip);
          if(this.tip.id != null && this.cookieService.get('pausappranzo_daily_login_done') != 'true'){
            this.openTipPopup();
          }
        },
        err => {
          console.log(err);
        }
      );

  }

  ngAfterContentInit(){
    this.loader.showLoader(false);
  }

  openTipPopup(){
    this.cookieService.set('pausappranzo_daily_login_done', 'true', 1);
    const dialogRef = this.dialog.open(TipDialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        tip: this.tip
      }
    });
  }



}
