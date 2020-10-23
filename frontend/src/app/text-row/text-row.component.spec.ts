import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRowComponent } from './text-row.component';

describe('TextRowComponent', () => {
  let component: TextRowComponent;
  let fixture: ComponentFixture<TextRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
