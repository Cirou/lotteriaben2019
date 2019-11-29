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

  ngOnInit() {
      
    console.log("Catalogo page");

    this.isAdminPage = this.rootService.logged;

    this.premiService.getAllPremi().subscribe(premi => {
        this.elencoPremi = premi;
        console.log(this.elencoPremi);
      },
        err => {
          console.log(err);
        });
  }
  
  
  private albums: any = [];

  open(index: number): void {
    // open lightbox
    const src = this.elencoPremi[index].immaginepremio;
    const album = {
      src: src,
      caption: this.elencoPremi[index].nomepremio
    };

    this.albums.push(album);
    this._lightbox.open(this.albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
