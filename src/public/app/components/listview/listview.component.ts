import { Component, Input, OnInit } from '@angular/core';
import { Gruppo } from '../../../../models/gruppo';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  @Input()
  elencoGruppi: Gruppo[];

  constructor() { }

  ngOnInit() {
  }

}
