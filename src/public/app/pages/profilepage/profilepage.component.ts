import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profilepage",
  templateUrl: "./profilepage.component.html",
  styleUrls: ["./profilepage.component.css"]
})
export class ProfilepageComponent implements OnInit {
  private user  = {
      "id": 1,
      "username": "luisa",
      "email": "luisa.somma@accenture.com",
      "nome": "luisa",
      "cognome": "somma",
      "img": "",
      "elencoGruppi": [
        {
          "id": 1,
          "nome": "fuoriorario",
          "descrizione": "Fuori Orario",
          "routerLink" : "fuoriorario"
        },
        {
          "id": 2,
          "nome": "genialloyd",
          "descrizione": "Genialloyd",
          "routerLink" : "genialloyd"
        }
      ],
      "elencoCibi" : [
        {
          "id": 1,
          "nome": "Pizza"
        },
        {
          "id": 2,
          "nome": "carne"
        }
      ]
    };
  private gruppi = "";
  private cibi  = "";
  public disabledField = "true";
  constructor() { }

  ngOnInit() {
   // this.user = UserService.getUserProfile(userId);
   if (this.user.elencoGruppi !== null && this.user.elencoGruppi !== undefined && this.user.elencoGruppi.length > 0) {
     this.gruppi = this.user.elencoGruppi[0].nome;
    for (let i = 1; i < this.user.elencoGruppi.length; i++) {
      this.gruppi = this.gruppi + "," + this.user.elencoGruppi[i].nome;
    }
   }

   if (this.user.elencoCibi !== null && this.user.elencoCibi !== undefined && this.user.elencoCibi.length > 0) {
    this.cibi = this.user.elencoCibi[0].nome;
   for (let i = 1; i < this.user.elencoCibi.length; i++) {
     this.cibi = this.cibi + "," + this.user.elencoCibi[i].nome;
    }
   }
  }

  onSubmit() {
    if (this.disabledField === "true") {
      this.disabledField = "false";
    } else {
      this.disabledField = "true";
    }

  }

  salvaModifiche() {
    this.disabledField = "true";
    // tdb
    // UserService.postUserProfile(user)
  }

}
