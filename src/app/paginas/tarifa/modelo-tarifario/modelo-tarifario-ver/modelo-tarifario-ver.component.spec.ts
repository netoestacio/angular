import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloTarifarioVerComponent } from './modelo-tarifario-ver.component';

describe('ModeloTarifarioVerComponent', () => {
  let component: ModeloTarifarioVerComponent;
  let fixture: ComponentFixture<ModeloTarifarioVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloTarifarioVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloTarifarioVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
