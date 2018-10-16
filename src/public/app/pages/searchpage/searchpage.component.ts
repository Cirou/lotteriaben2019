import { Component, OnInit, Inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { User } from '../../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserGroup } from '../../../models/UserGroup';
import { Pipe, PipeTransform } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RootService } from '../../services/root.service';
import { GroupService } from '../../services/group.service';
import { Group } from '../../../models/Group';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  id: number;
  private sub: any;
  searchString = '';
  userList: User[] = new Array;
  boxHeight: number;
  groupDetails: Group;

  constructor(private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private rootService: RootService,
    private groupService: GroupService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.boxHeight = this.document.body.clientHeight * 0.8;

    this.rootService.checkLoggedUser(this.router, this.userService);

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupService.getGroupDetails(this.id)
      .subscribe(
        groupDetails => {
          this.groupDetails = groupDetails[0];
          console.log(this.groupDetails);
        },
        err => {
          console.log(err);
        });


    this.userService.getAllUsers().subscribe(
      users => {
        users.forEach(user => {
          console.log(user);
          let found = false;
          user.groups.forEach(userGroup => {
            console.log(userGroup);
            if (userGroup.id == Number(this.id)) {
              found = true;
            }
          });
          if (!found) {
            this.userList.push(user);
          }
        });
      },
      err => {
        console.log(err);
      });
  }

  getSearchString(searchString: string) {
    this.searchString = searchString;
  }

  addUser(userId: number) {

    const userGroup: UserGroup = new UserGroup;
    userGroup.groupId = this.id;
    userGroup.userId = userId;

    this.userService.postUserGroup(userGroup).subscribe(user => {
      this.router.navigate(['/app', { outlets: { sub: ['groupdetail', this.id] } }]);
    },
      err => {
        console.log(err);
      });

  }

}
