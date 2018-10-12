import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.service';
import { RootService } from '../../services/root.service';
import { User } from '../../../models/User';
import { UserGroup } from '../../../models/UserGroup';

@Component({
  selector: 'app-groupdialog',
  templateUrl: './groupdialog.component.html',
  styleUrls: ['./groupdialog.component.css']
})
export class GroupdialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<GroupdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private rootService: RootService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  remove(userId: number) {

    let userGroup: UserGroup = new UserGroup;
    userGroup.groupId = this.data.groupDetails.id;
    userGroup.userId = userId;

    this.userService.deleteUserGroup(userGroup).subscribe(
      params => {
        this.data.groupDetails.users = this.data.groupDetails.users.filter(user => user.id != userGroup.userId);
      },
      err => {
        console.log(err);
      });
  }


}
