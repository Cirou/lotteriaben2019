import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  public isLoading:boolean;

  constructor(private loader:LoaderService) { }

  ngOnInit() {
    // this.loader.loading.subscribe(current => this.isLoading = current)
  }

}
