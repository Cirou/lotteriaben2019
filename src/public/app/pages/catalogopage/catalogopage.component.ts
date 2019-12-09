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
    constructor(private premiService: PremiService, private _lightbox: Lightbox, private rootService: RootService) { }
    elencoPremi: Premi[];

    isAdminPage: boolean;
    loading = false;
    offset = 0;

    ngOnInit() {
        console.log('Catalogo page');

        this.isAdminPage = this.rootService.logged;
        this.initPremi();
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

    initPremi() {
        this.offset = 0;
        this.albums = [];
        this.elencoPremi = [];
        this.loadPremi();
    }

    loadPremi() {
        this.loading = true;
        this.premiService.getPartialPremi(this.offset).subscribe(
            premi => {
                console.log(this.elencoPremi);

                // update lightbox album
                premi.forEach(premio => {
                    const src = premio.immaginebase64;
                    let caption = '<span>#' + premio.posizione + ' - ' + premio.nomepremio + '</span>';
                    if (premio.descrizionepremio) {
                        caption = caption + '<br><span>' + premio.descrizionepremio + '</span>';
                    }
                    const album = {
                        src: src,
                        caption: caption
                    };
                    this.elencoPremi.push(premio);
                    this.albums.push(album);
                });
                this.loading = false;

                if (premi.length === 10) {
                    this.offset += 10;
                    this.loadPremi();
                }
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
                this.initPremi();
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
