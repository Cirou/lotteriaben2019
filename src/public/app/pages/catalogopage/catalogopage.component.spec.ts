import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogopageComponent } from './Catalogopage.component';

describe('CatalogopageComponent', () => {
  let component: CatalogopageComponent;
  let fixture: ComponentFixture<CatalogopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
