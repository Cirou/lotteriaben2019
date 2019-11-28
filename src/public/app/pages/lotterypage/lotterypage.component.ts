import { Component, OnInit } from '@angular/core';
import { PremiService } from '../../services/premi.service';
import { Premi } from '../../../models/Premi';

@Component({
  selector: 'app-lotterypage',
  templateUrl: './lotterypage.component.html',
  styleUrls: ['./lotterypage.component.css']
})
export class LotterypageComponent implements OnInit {

  constructor(private premiService: PremiService) { }

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
      this.startCountDown();
  }

  intervalId = 0;
  message = '';
  seconds = 11;

  clearTimer() { clearInterval(this.intervalId); }

  ngOnDestroy() { this.clearTimer(); }

  startCountDown() { this.countDown(); }
  stopCountDown()  {
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
        this.message = `${this.seconds} secondi`;
      }
      console.log(this.message);
    }, 1000);

  }
}
