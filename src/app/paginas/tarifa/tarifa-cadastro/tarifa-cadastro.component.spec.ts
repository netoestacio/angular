import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaCadastroComponent } from './tarifa-cadastro.component';

describe('TarifaCadastroComponent', () => {
  let component: TarifaCadastroComponent;
  let fixture: ComponentFixture<TarifaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
