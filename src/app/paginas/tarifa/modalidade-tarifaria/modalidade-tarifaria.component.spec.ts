import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadeTarifariaComponent } from './modalidade-tarifaria.component';

describe('ModalidadeTarifariaComponent', () => {
  let component: ModalidadeTarifariaComponent;
  let fixture: ComponentFixture<ModalidadeTarifariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalidadeTarifariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadeTarifariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
