import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextVocabularyComponent } from './text-vocabulary.component';

describe('TextVocabularyComponent', () => {
  let component: TextVocabularyComponent;
  let fixture: ComponentFixture<TextVocabularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextVocabularyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
