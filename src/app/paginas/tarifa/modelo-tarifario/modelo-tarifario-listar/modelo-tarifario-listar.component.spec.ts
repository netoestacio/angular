import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloTarifarioListarComponent } from './modelo-tarifario-listar.component';

describe('ModeloTarifarioListarComponent', () => {
  let component: ModeloTarifarioListarComponent;
  let fixture: ComponentFixture<ModeloTarifarioListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloTarifarioListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloTarifarioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
