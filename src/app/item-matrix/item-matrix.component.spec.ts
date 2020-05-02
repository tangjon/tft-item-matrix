import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMatrixComponent } from './item-matrix.component';

describe('ItemMatrixComponent', () => {
  let component: ItemMatrixComponent;
  let fixture: ComponentFixture<ItemMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
