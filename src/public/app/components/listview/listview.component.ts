import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../../models/Group';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  @Input()
  elencoGruppi: Group[];

  constructor() { }

  ngOnInit() {
  }

}
