import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmemberdialogComponent } from './addmemberdialog.component';

describe('AddmemberdialogComponent', () => {
  let component: AddmemberdialogComponent;
  let fixture: ComponentFixture<AddmemberdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmemberdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmemberdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
