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
      this.start();
  }

  intervalId = 0;
  message = '';
  seconds = 11;

  clearTimer() { clearInterval(this.intervalId); }

  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'CI SIAMO!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `Mancano ${this.seconds} secondi`;
      }
      console.log(this.message);
    }, 1000);

}
