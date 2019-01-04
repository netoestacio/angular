import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgrupoVerComponent } from './subgrupo-ver.component';

describe('SubgrupoVerComponent', () => {
  let component: SubgrupoVerComponent;
  let fixture: ComponentFixture<SubgrupoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgrupoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgrupoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
