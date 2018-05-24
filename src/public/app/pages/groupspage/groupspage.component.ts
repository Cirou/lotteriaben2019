import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../models/User';
import { Gruppo } from '../../../../models/Gruppo';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groupspage',
  templateUrl: './groupspage.component.html',
  styleUrls: ['./groupspage.component.css']
})
export class GroupspageComponent implements OnInit {

  constructor(private userService: UserService, private groupService: GroupService) { }

  private user:User = new User;
  private elencoGruppi:Gruppo[] = new Array;

  ngOnInit() {

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

  }

}
