import { Component, OnInit } from '@angular/core';
import { PremiService } from '../../services/premi.service';
import { RootService } from '../../services/root.service';
import { Premi } from '../../../models/Premi';

@Component({
    selector: 'app-assegnapremiopage',
    templateUrl: './assegnapremiopage.component.html',
    styleUrls: ['./assegnapremiopage.component.css']
})
export class AssegnapremiopageComponent implements OnInit {

    constructor(private premiService: PremiService, private rootService: RootService) { }

    elencoPremi: Premi[];

    isAdminPage: boolean;

    ngOnInit() {

        console.log("Assegnapremio page");

        this.isAdminPage = this.rootService.logged;

        this.premiService.getAllPremi().subscribe(premi => {
            this.elencoPremi = premi;
            // Descending order
            this.elencoPremi.sort((a , b) => 0 - (a.posizione > b.posizione ? 1 : b > a ? 1 : 0));
            console.log(this.elencoPremi); },
            err => {
                console.log(err);
            });
            console.log(this.rootService.logged);
    }

    assegna(premio) {
        if (premio.numerovincitore && premio.nomevincitore) {
            this.premiService.putPremio(premio).subscribe(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }
            );
        } else {
            console.log('Verifica i campi obbligatori');
        }
    }

    ngOnDestroy() {  }
}

