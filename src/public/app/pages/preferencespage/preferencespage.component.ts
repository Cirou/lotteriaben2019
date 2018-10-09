import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { UserService } from '../../services/user.service';
import { Food } from '../../../models/Food';
import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';

@Component({
  selector: 'app-preferencespage',
  templateUrl: './preferencespage.component.html',
  styleUrls: ['./preferencespage.component.css']
})
export class PreferencespageComponent implements OnInit {

  elencoCibi: Food[];
  @ViewChild(MatSelectionList) cibo: MatSelectionList;

  constructor(private foodService: FoodService,
    private userService: UserService) { }

  ngOnInit() {

    this.foodService.getFoodList().subscribe(cibi => {
      this.elencoCibi = cibi;
      console.log(this.elencoCibi);
    },
      err => {
        console.log(err);
      });
  }

  savePreferences() {
    console.log(this.cibo.selectedOptions.selected.values);

    this.userService.postUserPreferences(null).subscribe(
      cibi => {
      },
      err => {
        console.log(err);
      });


  }

}
