import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloTarifarioCadastroComponent } from './modelo-tarifario-cadastro.component';

describe('ModeloTarifarioCadastroComponent', () => {
  let component: ModeloTarifarioCadastroComponent;
  let fixture: ComponentFixture<ModeloTarifarioCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloTarifarioCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloTarifarioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
