import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionariaCadastroComponent } from './concessionaria-cadastro.component';

describe('ConcessionariaCadastroComponent', () => {
  let component: ConcessionariaCadastroComponent;
  let fixture: ComponentFixture<ConcessionariaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessionariaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessionariaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
