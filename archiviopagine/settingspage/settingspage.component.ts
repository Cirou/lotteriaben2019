import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-settingspage",
  templateUrl: "./settingspage.component.html",
  styleUrls: ["./settingspage.component.css"]
})
export class SettingspageComponent implements OnInit {
  items = [
    {
      "id": 1,
      "icon": "group-icon",
      "iconName": "group",
      "nome": "Invita un amico",
      "routerLink" : ""
    },
    {
      "id": 2,
      "icon": "help-icon",
      "iconName": "help",
      "nome": "Aiuto",
      "routerLink" : ""
    }
  ];
  constructor() { }

  ngOnInit() {
  }



}
