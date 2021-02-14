import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../shared/common.css'],
})
export class FooterComponent implements OnInit {

  public version: string = String()


  constructor() { }

  ngOnInit(): void {
    this.version = environment.version;
  }
}
