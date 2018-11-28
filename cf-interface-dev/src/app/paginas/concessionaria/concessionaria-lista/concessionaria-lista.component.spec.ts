import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionariaListaComponent } from './concessionaria-lista.component';

describe('ConcessionariaListaComponent', () => {
  let component: ConcessionariaListaComponent;
  let fixture: ComponentFixture<ConcessionariaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessionariaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessionariaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
