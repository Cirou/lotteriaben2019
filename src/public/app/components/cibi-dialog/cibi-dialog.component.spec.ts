import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibiDialogComponent } from './cibi-dialog.component';

describe('CibiDialogComponent', () => {
  let component: CibiDialogComponent;
  let fixture: ComponentFixture<CibiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
