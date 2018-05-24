import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-groupspage',
  templateUrl: './groupspage.component.html',
  styleUrls: ['./groupspage.component.css']
})
export class GroupspageComponent implements OnInit {

  constructor(private userService: UserService) { }

  private user:User = new User;

  ngOnInit() {

    this.userService.getUserProfile()
    .subscribe(
      userInfo => {
        this.user = userInfo;
        console.log(this.user);
      },
      err => {
        console.log(err);
      });

  }

}
