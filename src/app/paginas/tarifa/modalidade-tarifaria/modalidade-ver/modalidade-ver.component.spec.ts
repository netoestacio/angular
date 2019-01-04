import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadeVerComponent } from './modalidade-ver.component';

describe('ModalidadeVerComponent', () => {
  let component: ModalidadeVerComponent;
  let fixture: ComponentFixture<ModalidadeVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalidadeVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadeVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
