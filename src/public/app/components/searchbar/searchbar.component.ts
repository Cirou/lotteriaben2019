import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public searchField: FormControl = new FormControl('');
  @Output() searchString = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onUserInput() {
  //  if (!this.searchField.invalid) {
      this.searchString.emit(this.searchField.value);
  //  }
  }

}
