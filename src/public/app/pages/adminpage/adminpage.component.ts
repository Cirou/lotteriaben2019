import { ImageService } from './../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-adminpage',
    templateUrl: './adminpage.component.html',
    styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

    constructor(
        private imageService: ImageService,
        private ng2ImgMax: Ng2ImgMaxService,
        public sanitizer: DomSanitizer) { }

    ngOnInit() {
    }

    loading = false;
    selectedFile: File;
    nome: string;
    posizione: string;
    descrizione: string;
    imagePreview: any;

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.loading = true;
        let image = event.target.files[0];

        this.ng2ImgMax.resizeImage(image, 10000, 500).subscribe(
            result => {
                this.selectedFile = new File([result], result.name);
                this.ng2ImgMax.resizeImage(image, 10000, 150).subscribe(
                    result => {
                        this.loading = false;
                        this.getImagePreview(new File([result], result.name));
                    },
                    error => {
                        this.loading = false;
                        console.log('Resize 2 error', error);
                    }
                );
            },
            error => {
                this.loading = false;
                console.log('Resize 1 error', error);
            }
        );

        
    }

    getImagePreview(file: File) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
    }

    onUpload() {
        if (this.nome !== '' && this.posizione !== '' && this.selectedFile && this.selectedFile.name) {
            this.loading = true;
            const uploadData = new FormData();
            uploadData.append('nome', this.nome);
            uploadData.append('posizione', this.posizione);
            uploadData.append('descrizione', this.descrizione);
            uploadData.append('file', this.selectedFile, this.selectedFile.name);
            // this.http is the injected HttpClient
            this.imageService.sendImage(uploadData).subscribe(
                (res) => {
                    this.loading = false;
                    console.log(res);
                },
                (err) => {
                    this.loading = false;
                    console.log(err);
                }
            );
        } else {
            console.log("verifica i campi obbligatori")
        }
    }

}
