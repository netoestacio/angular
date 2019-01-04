import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeListarComponent } from './unidade-listar.component';

describe('UnidadeListarComponent', () => {
  let component: UnidadeListarComponent;
  let fixture: ComponentFixture<UnidadeListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
