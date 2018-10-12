import { Component, OnInit , Inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { User } from '../../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserGroup } from '../../../models/UserGroup';
import { Pipe, PipeTransform } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.nome.toLowerCase().includes(searchText);
    });
   }
}


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  id: number;
  private sub: any;
  searchString = '';
  userList: User[];
  boxHeight: number;


  constructor(private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.boxHeight = this.document.body.clientHeight * 0.8;
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
