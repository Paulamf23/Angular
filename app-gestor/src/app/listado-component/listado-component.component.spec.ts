import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComponentComponent } from './listado-component.component';

describe('ListadoComponentComponent', () => {
  let component: ListadoComponentComponent;
  let fixture: ComponentFixture<ListadoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoComponentComponent]
    });
    fixture = TestBed.createComponent(ListadoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
