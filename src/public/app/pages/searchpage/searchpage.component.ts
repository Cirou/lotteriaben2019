import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { User } from '../../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserGroup } from '../../../models/UserGroup';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  id: number;
  private sub: any;
  searchString: string = '';
  userList: User[];


  constructor(private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userService.getAllUsers().subscribe(
      users => {
        this.userList = users;
      },
      err => {
        console.log(err);
      });
  }

  getSearchString(searchString: string) {
    this.searchString = searchString;
  }

  addUser(userId: number) {

    let userGroup: UserGroup = new UserGroup;
    userGroup.groupId = this.id;
    userGroup.userId = userId;

    this.userService.postUserGroup(userGroup).subscribe(user => {
      this.router.navigate(['/app', { outlets: { sub: ['groupdetail', this.id] } }])
    },
      err => {
        console.log(err);
      });

  }

}
