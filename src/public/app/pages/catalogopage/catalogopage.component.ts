import { Component, OnInit } from '@angular/core';
import { PremiService } from '../../services/premi.service';
import { Premi } from '../../../models/Premi';

@Component({
  selector: 'app-catalogopage',
  templateUrl: './catalogopage.component.html',
  styleUrls: ['./catalogopage.component.css']
})
export class CatalogopageComponent implements OnInit {

  constructor(private premiService: PremiService) { }

  
  elencoPremi: Premi[];

  ngOnInit() {
      
    console.log("Catalogo page");

    this.premiService.getAllPremi().subscribe(premi => {
        this.elencoPremi = premi;
        console.log(this.elencoPremi);
      },
        err => {
          console.log(err);
        });
  }

}
