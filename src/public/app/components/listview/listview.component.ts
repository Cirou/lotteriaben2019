import { Component, Input, OnInit } from '@angular/core';
import { Gruppi } from '../../../../models/gruppi';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  @Input()
  elencoGruppi: Gruppi[];

  constructor() { }

  ngOnInit() {
  }

}
