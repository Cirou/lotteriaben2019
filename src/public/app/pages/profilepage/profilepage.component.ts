import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profilepage",
  templateUrl: "./profilepage.component.html",
  styleUrls: ["./profilepage.component.css"]
})
export class ProfilepageComponent implements OnInit {
  private myprofile  = {
      "id": 1,
      "username": "luisa",
      "email": "luisa.somma@accenture.com"
    };

  public disabledField = "true";
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.disabledField === "true") {
      this.disabledField = "false";
    } else {
      this.disabledField = "true";
    }

  }

}
