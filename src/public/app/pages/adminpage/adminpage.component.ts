import { ImageService } from './../../services/image.service';
import { PremiService } from './../../services/premi.service';
import { Premi } from '../../../models/Premi';

import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';
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
export class AdminpageComponent implements OnInit {
    loading = false;
    selectedFile: File;
    nome: string;
    posizione: string;
    descrizione: string;
    imagePreview: any;
    isLogged = false;
    errorMessage = '';
    public id: FormControl = new FormControl('', [Validators.required]);
    public pwd: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    isNomeValido = true;
    isPosizioneValida = true;
    isImmagineValida = true;

    constructor(private imageService: ImageService,
        private ng2ImgMax: Ng2ImgMaxService,
         public sanitizer: DomSanitizer,
         private premiService: PremiService,
         private cookieService: CookieService,
         private rootService: RootService,
         private userService: UserService,
         ) { }

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
        if(this.selectedFile && this.selectedFile.name) {
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


    login() {
        this.errorMessage = '';
        this.rootService.loggedUserId = this.id.value;
        this.cookieService.set('lotteriaben2019_stay_logged_id', this.id.value, 10000);
        this.userService.getValidUser().subscribe(
          users => {
            let found = false;
            users.forEach(user => {
              if (user.id === this.rootService.loggedUserId &&
                user.isValid) {
                found = true;
                return;
              }
            });
            if (found) {
            //   this.goToHome();
                this.isLogged = true;
            } else {
              this.errorMessage = 'Invalid User';
              console.log('Invalid User');
            }
          },
          err => {
            console.log(err);
          });
      }
}
