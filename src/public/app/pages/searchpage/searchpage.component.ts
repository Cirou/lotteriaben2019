import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Gruppo } from '../../../../models/Gruppo';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  searchString: string = '';
  groupList: Gruppo[];
  userList: User[];
  

  getSearchString(searchString: string) {
    this.searchString = searchString;
    this.search();
  }

  ngOnInit() {
  }

  search() {
    this.searchService.getGroupsByName(this.searchString).subscribe(
      gropus => {
        this.groupList = gropus;
      });
    this.searchService.getUsersByName(this.searchString).subscribe(
      users => {
        this.userList = users;
      });
  }

}
