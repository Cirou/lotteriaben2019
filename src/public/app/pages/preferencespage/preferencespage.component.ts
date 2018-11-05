import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { UserService } from '../../services/user.service';
import { Food } from '../../../models/Food';
import { MatSelectionList } from '@angular/material';
import { Votation } from '../../../models/Votation';
import { RootService } from '../../services/root.service';
import { formatDate } from '../../../../shared/utils/DateUtils';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UserSuggestion } from '../../../models/UserSuggestion';

@Component({
  selector: 'app-preferencespage',
  templateUrl: './preferencespage.component.html',
  styleUrls: ['./preferencespage.component.css']
})
export class PreferencespageComponent implements OnInit {

  elencoCibi: Food[];
  preferenze: Votation[] = new Array;
  alreadyVoted = false;
  boxHeight: number;
  buttonHeight: number;
  elencoSuggerimenti: UserSuggestion[];


  @ViewChild(MatSelectionList) cibi: MatSelectionList;

  constructor(private foodService: FoodService,
    private userService: UserService,
    private rootService: RootService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {

    this.rootService.checkLoggedUser(this.router, this.userService);

    this.boxHeight = this.document.body.clientHeight - 160;

    if (this.rootService.votations.length > 0) {
      this.alreadyVoted = true;
    }

    this.foodService.getFoodList().subscribe(cibi => {
      this.elencoCibi = cibi;
      console.log(this.elencoCibi);

      this.userService.getUserSuggestion(Number(this.rootService.loggedUserId)).subscribe(suggerimenti => {
        this.elencoSuggerimenti = suggerimenti;

        this.elencoSuggerimenti.forEach(suggerimento => {
          this.elencoCibi.forEach(cibo => {
            if(cibo.id == suggerimento.food_id.id){
              cibo.consigliato = suggerimento.recommended;
            }
          });
        });

        console.log(this.elencoSuggerimenti);
      },
        err => {
          console.log(err);
        });


    },
      err => {
        console.log(err);
      });


  }

  isInSelectedFood(id: number) {
    if (this.rootService.votations.find(x => x.id === id)) {
      return true;
    }
    return false;
  }

  savePreferences() {

    this.cibi.selectedOptions.selected.forEach(element => {
      const preferenza: Votation = new Votation;
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
    this.router.navigate(['/app']);
  }

}
