import { Component, OnInit } from '@angular/core';
import { PremiService } from '../../services/premi.service';
import { Premi } from '../../../models/Premi';
import { RaccoltaService } from '../../services/raccolta.service';
import { Raccolta } from '../../../models/Raccolta';
import { Lightbox } from 'ngx-lightbox';

@Component({
    selector: 'app-lotterypage',
    templateUrl: './lotterypage.component.html',
    styleUrls: ['./lotterypage.component.css']
})
export class LotterypageComponent implements OnInit {
    constructor(private premiService: PremiService, private _lightbox: Lightbox, private raccoltaService: RaccoltaService) {}

    loadingTable = false;
    elencoPremi: Premi[];
    elencoUltimiPremi: Premi[];
    raccolta: Raccolta = new Raccolta();

    ngOnInit() {
        console.log('Lottery page');

        this.loadingTable = true;
        this.premiService.getAllPremiNoImages().subscribe(
            premi => {
                this.elencoPremi = premi;
                console.log(this.elencoPremi);
                this.loadingTable = false;
            },
            err => {
                this.loadingTable = false;
                console.log(err);
            }
        );

        this.premiService.getLastPremi().subscribe(
            premi => {
                this.elencoUltimiPremi = premi;
                console.log(this.elencoUltimiPremi);
                this.loadingTable = false;
            },
            err => {
                this.loadingTable = false;
                console.log(err);
            }
        );

        this.raccoltaService.getRaccolta().subscribe(
            raccolta => {
                this.raccolta = raccolta;
                console.log(this.raccolta);
            },
            err => {
                console.log(err);
            }
        );
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
    distance = 0;

    clearTimer() {
        clearInterval(this.intervalId);
    }

    ngOnDestroy() {
        this.clearTimer();
    }

    startCountDown() {
        this.countDown();
    }
    stopCountDown() {
        this.clearTimer();
        this.message = `Holding at T-${this.seconds} seconds`;
    }

    private getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
        const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                          .indexOf(dayName.slice(0,3).toLowerCase());
        if (dayOfWeek < 0) return;
        refDate.setHours(18,0,0,0);
        refDate.setDate(refDate.getDate() + +!!excludeToday + 
                        (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
        return refDate;
    }

    private countDown() {
        
        this.clearTimer();

        //const countDownDate = new Date('Dec 23, 2020 11:00:00').getTime();
        const countDownDate = this.getNextDayOfTheWeek("Thursday", true).getTime();

        this.intervalId = window.setInterval(() => {
            // Get todays date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            this.distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            // this.days = Math.floor(distance / (1000 * 3600 * 24));
            // this.hours = Math.floor((distance % (1000 * 3600  * 24))  / (1000 * 60 * 60));
            // this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            // this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.seconds = Math.floor(this.distance / 1000);
            this.minutes = Math.floor(this.seconds / 60);
            this.hours = Math.floor(this.minutes / 60);
            this.days = Math.floor(this.hours / 24);

            this.hours = this.hours - this.days * 24;
            this.minutes = this.minutes - this.days * 24 * 60 - this.hours * 60;
            this.seconds = this.seconds - this.days * 24 * 60 * 60 - this.hours * 60 * 60 - this.minutes * 60;

            this.daysToPrint = this.days.toString();
            this.hoursToPrint = this.hours.toString();
            this.minutesToPrint = this.minutes.toString();
            this.secondsToPrint = this.seconds.toString();

            if (this.days < 10) {
                this.daysToPrint = '0' + this.days;
            }
            if (this.hours < 10) {
                this.hoursToPrint = '0' + this.hours;
            }
            if (this.minutes < 10) {
                this.minutesToPrint = '0' + this.minutes;
            }
            if (this.seconds < 10) {
                this.secondsToPrint = '0' + this.seconds;
            }

            // If the count down is finished, write some text
            if (this.distance <= 0) {
                this.message = 'CI SIAMO!';
                clearInterval(this.intervalId);
            } else {
                this.message = `${this.daysToPrint} G : `
                    .concat(`${this.hoursToPrint} H : `)
                    .concat(`${this.minutesToPrint} M : `)
                    .concat(`${this.secondsToPrint} S`);
            }
        }, 1000);
    }

    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

    // private albums: any = [];

    open(index: number): void {
        // open lightbox

        const premio = this.elencoUltimiPremi.find(premio => {
            return premio.posizione === index
          })

        const src = premio.immaginebase64;
        let caption = '<span>'+premio.nomepremio+'</span>';
        if(premio.descrizionepremio) {
            caption = caption + '<br><span>' + premio.descrizionepremio+'</span>';
        }

        const albums = [];
        const album = {
            src: src,
            caption: caption
        };
        albums.push(album);
        this._lightbox.open(albums, 0);
    }

    close(): void {
        // close lightbox programmatically
        this._lightbox.close();
    }

}
