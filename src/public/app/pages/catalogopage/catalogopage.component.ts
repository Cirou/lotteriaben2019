import { deletePremioById } from './../../../../server/controllers/PremiController';
import { Component, OnInit, Input } from '@angular/core';
import { PremiService } from '../../services/premi.service';
import { Premi } from '../../../models/Premi';
import { Lightbox } from 'ngx-lightbox';
import { RootService } from '../../services/root.service';

@Component({
    selector: 'app-catalogopage',
    templateUrl: './catalogopage.component.html',
    styleUrls: ['./catalogopage.component.css']
})
export class CatalogopageComponent implements OnInit {
    constructor(private premiService: PremiService, private _lightbox: Lightbox, private rootService: RootService) {}
    elencoPremi: Premi[];

    isAdminPage: boolean;
    loading = false;

    ngOnInit() {
        console.log('Catalogo page');

        this.isAdminPage = this.rootService.logged;
        this.loadPremi();
    }

    private albums: any = [];

    open(index: number): void {
        // open lightbox
        this._lightbox.open(this.albums, index);
    }

    close(): void {
        // close lightbox programmatically
        this._lightbox.close();
    }

    loadPremi() {
        this.loading = true;
        this.premiService.getAllPremi().subscribe(
            premi => {
                this.elencoPremi = premi;
                console.log(this.elencoPremi);

                this.loading = false;
                // update lightbox album
                this.albums = [];
                this.elencoPremi.forEach(premio => {
                    const src = premio.immaginebase64;
                    let caption = premio.posizione + ' - ' + premio.nomepremio;
                    if(premio.descrizionepremio) {
                        caption = caption + ' - ' + premio.descrizionepremio;
                    }
                    const album = {
                        src: src,
                        caption: caption
                    };
                    this.albums.push(album);
                });
            },
            err => {
                this.loading = false;
                console.log(err);
            }
        );
    }

    setIdToDelete(id: number): void {
        this.idToDelete = id;
    }

    deletePremioById(id) {
        this.idToDelete = null;
        this.loading = true;
        this.premiService.deletePremio(id).subscribe(
            res => {
                this.loading = false;
                console.log(res);
                this.loadPremi();
            },
            err => {
                this.loading = false;
                console.log(err);
            }
        );
    }

    idToDelete: number = null;
    setDeleteId(id) {
        this.idToDelete = id;
    }
}
