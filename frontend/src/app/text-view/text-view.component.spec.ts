import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewComponent } from './text-view.component';

describe('TextComponent', () => {
  let component: TextViewComponent;
  let fixture: ComponentFixture<TextViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
