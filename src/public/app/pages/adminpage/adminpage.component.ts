import { ImageService } from './../../services/image.service';
import { PremiService } from './../../services/premi.service';
import { Premi } from '../../../models/Premi';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { RootService } from '../../services/root.service';
import { UserService } from '../../services/user.service';

import { FormControl, Validators } from '@angular/forms';

export const IMAGE_WIDTH_UPLOAD = 500;
export const IMAGE_WIDTH_PREVIEW = 150;

@Component({
    selector: 'app-adminpage',
    templateUrl: './adminpage.component.html',
    styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit, OnDestroy {
    loading = false;
    selectedFile: File;
    nome: string;
    posizione: string;
    descrizione: string;
    imagePreview: any;
    isLogged = false;
    errorMessage = '';
    public pwd: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    //validation
    isNomeValido = true;
    isPosizioneValida = true;
    isImmagineValida = true;
    isImmagineModificata = false;

    private idPremio = null;
    private sub: any;

    constructor(
        private imageService: ImageService,
        private ng2ImgMax: Ng2ImgMaxService,
        public sanitizer: DomSanitizer,
        private premiService: PremiService,
        private route: ActivatedRoute,
        private rootService: RootService,
        private userService: UserService, ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.idPremio = params['id']; // (+) converts string 'id' to a number

            if (this.idPremio) {
                this.premiService.getPremioById(this.idPremio).subscribe(
                    res => {
                        console.log(res);
                        res = res[0];
                        this.nome = res.nomepremio;
                        this.posizione = res.posizione + '';
                        this.descrizione = res.descrizionepremio;
                        fetch(res.immaginepremio)
                            .then(res =>
                                res.blob()
                            ) // Gets the response and returns it as a blob
                            .then(blob => {
                                this.selectedFile = new File([blob], res.immaginepremio);
                                this.getImagePreview(this.selectedFile);
                            });

                    },
                    err => {
                        console.log(err);
                    }
                );
            }
            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.loading = true;
        let image = event.target.files[0];

        //limiting the resulting image to about 75Kb:
        //this.ng2ImgMax.compressImage(image, 0.075).subscribe(...)

        this.ng2ImgMax.resizeImage(image, 10000, IMAGE_WIDTH_UPLOAD).subscribe(
            result => {
                this.selectedFile = new File([result], result.name);
                this.isImmagineModificata = true;
                this.ng2ImgMax.resizeImage(image, 10000, IMAGE_WIDTH_PREVIEW).subscribe(
                    result => {
                        this.isImmagineValida = true;
                        this.loading = false;
                        this.getImagePreview(new File([result], result.name));
                    },
                    error => {
                        this.isImmagineValida = false;
                        this.loading = false;
                        console.log('Resize 2 error', error);
                    }
                );
            },
            error => {
                this.isImmagineValida = false;
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

    changeName(form) {
        if (form.nome === undefined || form.nome === '') {
            this.isNomeValido = false;
        } else {
            this.isNomeValido = true;
        }
    }

    changePosizione(form) {
        if (form.posizione === undefined || form.posizione === null) {
            this.isPosizioneValida = false;
        } else {
            this.isPosizioneValida = true;
        }
    }

    changeFields(form) {
        this.changeName(form);
        this.changePosizione(form);
        if (this.selectedFile && this.selectedFile.name) {
            this.isImmagineValida = true;
        } else {
            this.isImmagineValida = false;
        }
    }

    onUpload(form) {
        this.changeFields(form);
        if (this.isNomeValido && this.isPosizioneValida && this.isImmagineValida) {
            this.loading = true;

            const premio = new Premi();
            premio.nomepremio = this.nome;
            premio.posizione = parseInt(this.posizione);
            premio.descrizionepremio = this.descrizione;

            console.log(premio);

            if (!this.idPremio) {
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
                if (this.isImmagineModificata) {
                    const uploadFile = new FormData();
                    uploadFile.append('file', this.selectedFile, this.selectedFile.name);

                    this.imageService.sendImage(uploadFile).subscribe(
                        res => {
                            console.log(res);
                            premio.immaginepremio = res.file_path;
                            this.premiService.putPremio(premio).subscribe(
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
                    this.premiService.putPremio(premio).subscribe(
                        res => {
                            this.loading = false;
                            console.log(res);
                        },
                        err => {
                            this.loading = false;
                            console.log(err);
                        }
                    );
                }
            }
        } else {
            console.log('Verifica i campi obbligatori');
        }
    }

    login() {
        this.errorMessage = '';
        this.userService.postUser(this.pwd.value).subscribe(
            user => {
                if (user.isValid) {
                    this.isLogged = true;
                } else {
                    this.errorMessage = 'Invalid User';
                    console.log('Invalid User');
                }
            },
            err => {
                console.log(err);
            }
        );
    }
}
