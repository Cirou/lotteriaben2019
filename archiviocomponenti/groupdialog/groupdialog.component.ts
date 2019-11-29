import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RootService } from '../../services/root.service';
import { User } from '../../../models/User';
import { UserGroup } from '../../../models/UserGroup';

@Component({
  selector: 'app-groupdialog',
  templateUrl: './groupdialog.component.html',
  styleUrls: ['./groupdialog.component.css']
})
export class GroupdialogComponent implements OnInit {

  loggedUser:User;

  constructor(public dialogRef: MatDialogRef<GroupdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rootService: RootService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.loggedUser = this.rootService.loggedUser;
  }

  remove(userId: number) {

    let userGroup: UserGroup = new UserGroup;
    userGroup.groupId = this.data.groupDetails.id;
    userGroup.userId = userId;
    
  }


}
