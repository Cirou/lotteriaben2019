import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../../models/Food';

@Component({
  selector: 'app-preferencespage',
  templateUrl: './preferencespage.component.html',
  styleUrls: ['./preferencespage.component.css']
})
export class PreferencespageComponent implements OnInit {

  elencoCibi:Food[];

  constructor(private foodService:FoodService) { }

  ngOnInit() {

    this.foodService.getFoodList().subscribe(cibi => {
      this.elencoCibi = cibi;
      console.log(this.elencoCibi);
    },
      err => {
        console.log(err);
      });
  }

}
