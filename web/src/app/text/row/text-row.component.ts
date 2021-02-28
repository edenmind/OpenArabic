import { Component, OnInit, Input } from '@angular/core';
import { Sentence } from '../../models/sentence';

@Component({
  selector: 'app-text-row',
  templateUrl: './text-row.component.html',
  styleUrls: ['./text-row.component.css'],
})
export class TextRowComponent implements OnInit {
  @Input()
  sentence: Sentence = new Sentence;
  @Input()
  language: string = String();

  constructor() { }

  ngOnInit(): void { }
}
