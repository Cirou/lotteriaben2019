import { Component, OnInit, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../models/User';
import { Gruppo } from '../../../../models/Gruppo';
import { GroupService } from '../../services/group.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-groupspage',
  templateUrl: './groupspage.component.html',
  styleUrls: ['./groupspage.component.css']
})
export class GroupspageComponent implements OnInit {

  @Output() showLoader = new EventEmitter<boolean>();

  constructor(private userService: UserService, private groupService: GroupService,  private loader: LoaderService) { }

  private user:User = new User;
  private elencoGruppi:Gruppo[] = new Array;

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

  }

  ngAfterContentInit(){
    this.loader.showLoader(false);
  }

}
