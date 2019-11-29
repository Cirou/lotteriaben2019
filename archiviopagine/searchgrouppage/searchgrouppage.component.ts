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
  selector: 'app-searchgrouppage',
  templateUrl: './searchgrouppage.component.html',
  styleUrls: ['./searchgrouppage.component.css']
})
export class SearchgrouppageComponent implements OnInit {

  id: number;
  private sub: any;
  searchString = '';
  groupList: Group[] = new Array;
  boxHeight: number;


  constructor(private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private rootService: RootService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.boxHeight = this.document.body.clientHeight * 0.8;

    this.rootService.checkLoggedUser(this.router, this.userService);

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.groupService.getAllGroups().subscribe(
      groups => {
        groups.forEach(group => {
          let found = false;
          this.rootService.loggedUser.groups.forEach(userGroup => {
            if (group.id == Number(userGroup.id)) {
              found = true;
            }
          });
          if (!found) {
            this.groupList.push(group);
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

  addUser(groupId: number) {

    const userGroup: UserGroup = new UserGroup;
    userGroup.groupId = groupId;
    userGroup.userId = Number(this.rootService.loggedUserId);

    this.userService.postUserGroup(userGroup).subscribe(user => {
      this.router.navigate(['/app', { outlets: { sub: ['groupdetail', this.id] } }]);
    },
      err => {
        console.log(err);
      });

  }

}
