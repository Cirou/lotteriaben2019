import { Component, OnInit } from '@angular/core';
import { Raccolta } from '../../../models/Raccolta';
import { RaccoltaService } from '../../services/raccolta.service';
import { RootService } from '../../services/root.service';

@Component({
    selector: 'app-risultativenditepage',
    templateUrl: './risultativenditepage.component.html',
    styleUrls: ['./risultativenditepage.component.css']
})
export class RisultativenditepageComponent implements OnInit {
    constructor(private raccoltaService: RaccoltaService, private rootService: RootService) {}

    raccolta: Raccolta;
    isAdminPage: boolean;
    loading = false;

    ngOnInit() {
        console.log('Risultativendite page');

        this.isAdminPage = this.rootService.logged;
        this.loading = true;

        this.raccoltaService.getRaccolta().subscribe(
            raccolta => {
                this.raccolta = raccolta;
                console.log(this.raccolta);
                this.loading = false;
            },
            err => {
                console.log(err);
                this.loading = false;
            }
        );

        this.loading = false;
    }

    salva() {
        this.loading = true;
        this.raccoltaService.saveRaccolta(this.raccolta).subscribe(
            raccolta => {
                this.raccolta = raccolta;
                console.log(this.raccolta);
                this.loading = false;
            },
            err => {
                console.log(err);
                this.loading = false;
            }
        );
        this.loading = false;
    }
}
