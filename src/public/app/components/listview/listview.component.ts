import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  navGroupMenu = [
    {
      "id": 1,
      "nome": "fuoriorario",
      "descrizione": "Fuori Orario",
      "routerLink" :"fuoriorario"
    },
    {
      "id": 2,
      "nome": "genialloyd",
      "descrizione": "Genialloyd",
      "routerLink" :"genialloyd"
    },
    {
      "id": 3,
      "nome": "fantacalcio",
      "descrizione": "Fantacalcio",
      "routerLink" :"fantacalcio"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

 
    
  
}
