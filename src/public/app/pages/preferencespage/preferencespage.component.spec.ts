import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencespageComponent } from './preferencespage.component';

describe('PreferencespageComponent', () => {
  let component: PreferencespageComponent;
  let fixture: ComponentFixture<PreferencespageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
