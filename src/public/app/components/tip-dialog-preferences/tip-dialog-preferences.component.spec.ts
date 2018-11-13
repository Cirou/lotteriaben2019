import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipDialogPreferencesComponent } from './tip-dialog-preferences.component';

describe('TipDialogPreferencesComponent', () => {
  let component: TipDialogPreferencesComponent;
  let fixture: ComponentFixture<TipDialogPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipDialogPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipDialogPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
