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
    nome: string;
    posizione: string;
    descrizione: string;
    imagePreview: any;
    imageToUpload: any;
    isLogged: boolean;
    errorMessage = '';
    public pwd: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    //validation
    isNomeValido = true;
    isPosizioneValida = true;
    isImmagineValida = true;

    private idPremio = null;
    private sub: any;

    constructor(
        private ng2ImgMax: Ng2ImgMaxService,
        public sanitizer: DomSanitizer,
        private premiService: PremiService,
        private route: ActivatedRoute,
        private rootService: RootService,
        private userService: UserService) { }

    ngOnInit() {
        this.isLogged = this.rootService.logged;

        this.sub = this.route.params.subscribe(params => {
            this.idPremio = params['id'];

            if (this.idPremio) {
                this.premiService.getPremioById(this.idPremio).subscribe(
                    res => {
                        console.log(res);
                        res = res[0];
                        this.nome = res.nomepremio;
                        this.posizione = res.posizione + '';
                        this.descrizione = res.descrizionepremio;
                        this.imageToUpload = res.immaginebase64;
                        fetch(res.immaginebase64)
                            .then(res =>
                                res.blob()
                            ) // Gets the response and returns it as a blob
                            .then(blob => {
                                const image = new File([blob], res.immaginebase64, blob);

                                this.ng2ImgMax.resizeImage(image, 10000, IMAGE_WIDTH_PREVIEW).subscribe(
                                    result => {
                                        this.loading = false;
                                        this.imagePreview = URL.createObjectURL(result);
                                    },
                                    error => {
                                        this.loading = false;
                                        console.log('Resize preview', error);
                                    }
                                );
                            });

                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onFileChanged(event) {
        this.loading = true;
        let image = event.target.files[0];

        //limiting the resulting image to about 75Kb:
        //this.ng2ImgMax.compressImage(image, 0.075).subscribe(...)

        this.ng2ImgMax.resizeImage(image, 10000, IMAGE_WIDTH_UPLOAD).subscribe(
            result => {
                this.getImageToUpload(new File([result], result.name, result));
                this.ng2ImgMax.resizeImage(image, 10000, IMAGE_WIDTH_PREVIEW).subscribe(
                    result => {
                        this.isImmagineValida = true;
                        this.loading = false;
                        this.imagePreview = URL.createObjectURL(result);
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

    getImageToUpload(file: File) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log("Converted Base64 version is " + reader.result);
            this.imageToUpload = reader.result;
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
        if (this.imagePreview) {
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
            premio.immaginebase64 = this.imageToUpload;

            console.log(premio);

            if (!this.idPremio) {
                this.premiService.postPremio(premio).subscribe(
                    res => {
                        this.loading = false;
                        console.log(res);
                        this.reset();
                    },
                    err => {
                        this.loading = false;
                        console.log(err);
                    }
                );
            } else {
                premio.id = this.idPremio;
                this.premiService.putPremio(premio).subscribe(
                    res => {
                        this.loading = false;
                        console.log(res);
                        this.reset();
                    },
                    err => {
                        this.loading = false;
                        console.log(err);
                    }
                );
            }
        } else {
            console.log('Verifica i campi obbligatori');
        }
    }

    reset() {
        this.idPremio = null;
        this.nome = '';
        this.posizione = '';
        this.descrizione = '';
        this.imageToUpload = null;
        this.imagePreview = null;
    }

    login() {
        this.errorMessage = '';
        this.userService.postUser(this.pwd.value).subscribe(
            user => {
                if (user.isValid) {
                    this.rootService.logged = true;
                    this.isLogged = this.rootService.logged;
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
