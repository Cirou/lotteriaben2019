import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../models/User';
import { UserTip } from '../../../../models/UserTip';
import { Gruppo } from '../../../../models/Gruppo';
import { GroupService } from '../../services/group.service';
import { LoaderService } from '../../services/loader.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TipDialogComponent } from "../../components/tip-dialog/tip-dialog.component";

@Component({
  selector: 'app-groupspage',
  templateUrl: './groupspage.component.html',
  styleUrls: ['./groupspage.component.css']
})
export class GroupspageComponent implements OnInit {

  @Output() showLoader = new EventEmitter<boolean>();

  constructor(private userService: UserService, private groupService: GroupService,  private loader: LoaderService, public dialog: MatDialog) { }

  user:User = new User;
  elencoGruppi:Gruppo[] = new Array;
  tip:UserTip = new UserTip;

  ngOnInit() {

    this.loader.showLoader(true);

    this.userService.getUserProfile()
    .subscribe(
      userInfo => {
        this.user = userInfo;
        this.user.elencoGruppi.forEach(element => {
          this.groupService.getGroupDetails(element).subscribe(
            groupInfo => {
              this.elencoGruppi.push(groupInfo)
            }
          );
        });
        ;
        console.log(this.user);
      },
      err => {
        console.log(err);
      });

      this.userService.getUserLoginTip()
      .subscribe(
        userTip => {
          this.tip = userTip;
          console.log(this.tip);
          if(this.tip.id != null){
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
    const dialogRef = this.dialog.open(TipDialogComponent, {
      height: "400px",
      width: "600px",
      data: {
        tip: this.tip
      }
    });
  }



}
