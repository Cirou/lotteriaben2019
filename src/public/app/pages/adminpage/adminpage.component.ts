import { ImageService } from './../../services/image.service';
import { PremiService } from './../../services/premi.service';
import { Premi } from '../../../models/Premi';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-adminpage',
    templateUrl: './adminpage.component.html',
    styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
    constructor(private imageService: ImageService, private premiService: PremiService) {}

    ngOnInit() {}

    selectedFile: File;
    nome: string;
    posizione: string;
    descrizione: string;

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
    }

    onUpload() {
        if (this.nome !== '' && this.posizione !== '' && this.selectedFile && this.selectedFile.name) {
            
            let premio = new Premi();
            premio.nomepremio = this.nome;
            premio.posizione = parseInt(this.posizione);
            premio.descrizionepremio = this.descrizione;

            console.log(premio);

            const uploadFile = new FormData();
            uploadFile.append('file', this.selectedFile, this.selectedFile.name);

            // this.http is the injected HttpClient
            this.imageService.sendImage(uploadFile).subscribe(res => console.log(res), err => console.log(err));
            this.premiService.postPremio(premio).subscribe(res => console.log(res), err => console.log(err));
        }
    }
}
