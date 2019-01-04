import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadeListarComponent } from './modalidade-listar.component';

describe('ModalidadeListarComponent', () => {
  let component: ModalidadeListarComponent;
  let fixture: ComponentFixture<ModalidadeListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalidadeListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
