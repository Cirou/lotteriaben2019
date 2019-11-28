import { Component, OnInit } from '@angular/core';
import { PremiService } from '../../services/premi.service';
import { RootService } from '../../services/root.service';
import { Router } from '@angular/router';
import { Premi } from '../../../models/Premi';


@Component({
  selector: 'app-lotterypage',
  templateUrl: './lotterypage.component.html',
  styleUrls: ['./lotterypage.component.css']
})
export class LotterypageComponent implements OnInit {

  constructor(
    private premiService: PremiService,
    private rootService: RootService,
    private router: Router) { }

  elencoPremi: Premi[];

  ngOnInit() {

    console.log("Lottery page");

    this.premiService.getAllPremi().subscribe(premi => {
      this.elencoPremi = premi;
      console.log(this.elencoPremi);
    },
      err => {
        console.log(err);
      });
  }

}
