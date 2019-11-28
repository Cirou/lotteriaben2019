import { ImageService } from './../../services/image.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-catalogopage',
    templateUrl: './catalogopage.component.html',
    styleUrls: ['./catalogopage.component.css']
})
export class CatalogopageComponent implements OnInit {

    constructor(private imageService: ImageService) { }

    ngOnInit() {
    }

    selectedFile: File;
    nome: string;
    posizione: string;
    descrizione: string;

    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
    }

    onUpload() {
        if (this.nome !== '' && this.posizione  !== '' && this.selectedFile && this.selectedFile.name) {
            const uploadData = new FormData();
            uploadData.append('nome', this.nome);
            uploadData.append('posizione', this.posizione);
            uploadData.append('descrizione', this.descrizione);
            uploadData.append('file', this.selectedFile, this.selectedFile.name);
            // this.http is the injected HttpClient
            this.imageService.sendImage(uploadData).subscribe(
                (res) => console.log(res),
                (err) => console.log(err)
            );
        }
    }

}
