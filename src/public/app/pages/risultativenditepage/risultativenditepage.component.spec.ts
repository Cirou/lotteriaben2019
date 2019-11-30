import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisultativenditepageComponent } from './risultativenditepage.component';

describe('RisultativenditepageComponent', () => {
  let component: RisultativenditepageComponent;
  let fixture: ComponentFixture<RisultativenditepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisultativenditepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisultativenditepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
