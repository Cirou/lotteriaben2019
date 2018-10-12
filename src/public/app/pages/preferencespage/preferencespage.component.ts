import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { UserService } from '../../services/user.service';
import { Food } from '../../../models/Food';
import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';
import { Votation } from '../../../models/Votation';
import { RootService } from '../../services/root.service';
import { formatDate } from '../../../../shared/utils/DateUtils'
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferencespage',
  templateUrl: './preferencespage.component.html',
  styleUrls: ['./preferencespage.component.css']
})
export class PreferencespageComponent implements OnInit {

  elencoCibi: Food[];
  preferenze: Votation[] = new Array;
  alreadyVoted: boolean = false;
  @ViewChild(MatSelectionList) cibi: MatSelectionList;

  constructor(private foodService: FoodService,
    private userService: UserService,
    private rootService: RootService,
    private router: Router) { }

  ngOnInit() {

    if(this.rootService.votations.length > 0){
      this.alreadyVoted = true;
    }

    this.foodService.getFoodList().subscribe(cibi => {
      this.elencoCibi = cibi;
      console.log(this.elencoCibi);
    },
      err => {
        console.log(err);
      });
  }

  savePreferences() {
    
    this.cibi.selectedOptions.selected.forEach(element => {
      let preferenza:Votation = new Votation;
      preferenza.data = formatDate(new Date);
      preferenza.food_id = element.value.id;
      preferenza.user_id = Number(this.rootService.loggedUserId);
      this.preferenze.push(preferenza);
    });
    
    console.log(this.preferenze);

    this.userService.postUserVotation(this.preferenze).subscribe(
      preferenze => {
        console.log(preferenze);
      },
      err => {
        console.log(err);
      });
  }

  cancelPreferences(): void {
    this.router.navigate(['/app'])
  }  

}
