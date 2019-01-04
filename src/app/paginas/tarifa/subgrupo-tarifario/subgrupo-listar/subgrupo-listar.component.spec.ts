import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgrupoListarComponent } from './subgrupo-listar.component';

describe('SubgrupoListarComponent', () => {
  let component: SubgrupoListarComponent;
  let fixture: ComponentFixture<SubgrupoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgrupoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgrupoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
