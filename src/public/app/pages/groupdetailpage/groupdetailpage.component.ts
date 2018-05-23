import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groupdetailpage',
  templateUrl: './groupdetailpage.component.html',
  styleUrls: ['./groupdetailpage.component.css']
})
export class GroupdetailpageComponent implements OnInit {

  id: string;
  jsonGroupDetail:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   });
   this.jsonGroupDetail = 
    {
      "id": 1,
      "nome": "fuoriorario",
      "descrizione": "Fuori Orario",
      "routerLink" :"fuoriorario"
    }
  ;

  }

}
