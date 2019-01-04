import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeCadastroComponent } from './unidade-cadastro.component';

describe('UnidadeCadastroComponent', () => {
  let component: UnidadeCadastroComponent;
  let fixture: ComponentFixture<UnidadeCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
