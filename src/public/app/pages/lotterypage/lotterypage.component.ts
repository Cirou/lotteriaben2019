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
    elencoUltimiPremi: Premi[];

    ngOnInit() {

        console.log("Lottery page");

        this.premiService.getAllPremi().subscribe(premi => {
            this.elencoPremi = premi;
            console.log(this.elencoPremi);
            this.elencoUltimiPremi = this.elencoPremi.filter(function (el) {
                return el.numerovincitore != null;
            });
            if(this.elencoUltimiPremi.length > 2) {
                this.elencoUltimiPremi = this.elencoUltimiPremi.slice(0, 3);
            }
        },
            err => {
                console.log(err);
            });
        this.startCountDown();
    }

    intervalId = 0;
    message = '';
    //seconds = 11;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    daysToPrint: String = '';
    hoursToPrint: String = '';
    minutesToPrint: String = '';
    secondsToPrint: String = '';


    clearTimer() { clearInterval(this.intervalId); }

    ngOnDestroy() { this.clearTimer(); }

    startCountDown() { this.countDown(); }
    stopCountDown() {
        this.clearTimer();
        this.message = `Holding at T-${this.seconds} seconds`;
    }

    private countDown() {
        this.clearTimer();

        const countDownDate = new Date('Dec 23, 2019 12:00:00').getTime();

        this.intervalId = window.setInterval(() => {

            // Get todays date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            // this.days = Math.floor(distance / (1000 * 3600 * 24));
            // this.hours = Math.floor((distance % (1000 * 3600  * 24))  / (1000 * 60 * 60));
            // this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            // this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.seconds = Math.floor(distance / 1000);
            this.minutes = Math.floor(this.seconds / 60);
            this.hours = Math.floor(this.minutes / 60);
            this.days = Math.floor(this.hours / 24);

            this.hours = this.hours - (this.days * 24);
            this.minutes = this.minutes - (this.days * 24 * 60) - (this.hours * 60);
            this.seconds = this.seconds - (this.days * 24 * 60 * 60) - (this.hours * 60 * 60) - (this.minutes * 60);

            this.daysToPrint = this.days.toString();
            this.hoursToPrint = this.hours.toString();
            this.minutesToPrint = this.minutes.toString();
            this.secondsToPrint = this.seconds.toString();

            if (this.days < 10) { this.daysToPrint = '0' + this.days; }
            if (this.hours < 10) { this.hoursToPrint = '0' + this.hours; }
            if (this.minutes < 10) { this.minutesToPrint = '0' + this.minutes; }
            if (this.seconds < 10) { this.secondsToPrint = '0' + this.seconds; }

            // If the count down is finished, write some text
            if (distance < 0) {
                this.message = 'CI SIAMO!';
                clearInterval(this.intervalId);
            } else {
                this.message = `${this.daysToPrint} G : `.concat(`${this.hoursToPrint} H : `).concat(`${this.minutesToPrint} M : `).concat(`${this.secondsToPrint} S`);
            }
        }, 1000);

    }
    
    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }
}
