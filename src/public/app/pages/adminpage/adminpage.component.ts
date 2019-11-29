import { ImageService } from './../../services/image.service';
import { PremiService } from './../../services/premi.service';
import { Premi } from '../../../models/Premi';

import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

export const IMAGE_WIDTH_UPLOAD = 500;
export const IMAGE_WIDTH_PREVIEW = 150;

@Component({
    selector: 'app-adminpage',
    templateUrl: './adminpage.component.html',
    styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
    loading = false;
    selectedFile: File;
    nome: string;
    posizione: string;
    descrizione: string;
    imagePreview: any;

    constructor(private imageService: ImageService, private ng2ImgMax: Ng2ImgMaxService, public sanitizer: DomSanitizer, private premiService: PremiService) {}

    ngOnInit() {}

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.loading = true;
        let image = event.target.files[0];

        //limiting the resulting image to about 75Kb:
        //this.ng2ImgMax.compressImage(image, 0.075).subscribe(...)

        this.ng2ImgMax.resizeImage(image, 10000, IMAGE_WIDTH_UPLOAD).subscribe(
            result => {
                this.selectedFile = new File([result], result.name);
                this.ng2ImgMax.resizeImage(image, 10000, IMAGE_WIDTH_PREVIEW).subscribe(
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
        if (this.nome && this.posizione && this.selectedFile && this.selectedFile.name) {
            this.loading = true;

            let premio = new Premi();
            premio.nomepremio = this.nome;
            premio.posizione = parseInt(this.posizione);
            premio.descrizionepremio = this.descrizione;

            console.log(premio);

            const uploadFile = new FormData();
            uploadFile.append('file', this.selectedFile, this.selectedFile.name);

            // this.http is the injected HttpClient
            this.imageService.sendImage(uploadFile).subscribe(
                res => {
                    console.log(res);
                    premio.immaginepremio = res.file_path;
                    this.premiService.postPremio(premio).subscribe(
                        res => {
                            this.loading = false;
                            console.log(res);
                        },
                        err => {
                            this.loading = false;
                            console.log(err);
                        }
                    );
                },
                err => {
                    this.loading = false;
                    console.log(err);
                }
            );
        } else {
            console.log('Verifica i campi obbligatori');
        }
    }
}
