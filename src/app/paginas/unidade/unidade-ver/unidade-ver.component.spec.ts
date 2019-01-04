import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeVerComponent } from './unidade-ver.component';

describe('UnidadeVerComponent', () => {
  let component: UnidadeVerComponent;
  let fixture: ComponentFixture<UnidadeVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
