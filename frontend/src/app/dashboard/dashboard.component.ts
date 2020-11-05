import { Component, OnInit } from '@angular/core';
import { TextService } from '../services/text.service';
import { Text } from '../models/text';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../shared/common.css'],
})
export class DashboardComponent implements OnInit {
  texts: Text[];

  cols: number = 1;
  rows: number = 1;

  badgeHidden: boolean = false;
  showSpinner: boolean = true;

  pageNumber: number;
  pageSize: number = 25;

  author: string;
  category: string;
  subscription: Subscription;

  breakPoint: number;

  constructor(
    private textService: TextService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.category = this.activeRoute.snapshot.paramMap.get('category');
    this.author = this.activeRoute.snapshot.paramMap.get('author');

    this.breakPoint = window.innerWidth <= 1200 ? 1 : 3;

    if (this.category) {
      //show categories
      this.subscription = this.textService
        .getTexts('empty', this.category, this.pageSize, this.pageNumber)
        .subscribe(
          (texts) => ((this.texts = texts), (this.showSpinner = false))
        );
    } else if (this.author) {
      //show authors
      this.subscription = this.textService
        .getTexts(this.author, 'empty', this.pageSize, this.pageNumber)
        .subscribe(
          (texts) => ((this.texts = texts), (this.showSpinner = false))
        );
    } else {
      //show everything
      this.subscription = this.textService
        .getTexts('empty', 'empty', this.pageSize, this.pageNumber)
        .subscribe(
          (texts) => ((this.texts = texts), (this.showSpinner = false))
        );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleBadgeVisibility() {
    this.badgeHidden = !this.badgeHidden;
  }

  openCard(id: number): void {
    this.route.navigate(['/text/', id]);
  }

  onResize(event) {
    this.breakPoint = event.target.innerWidth <= 1200 ? 1 : 3;
  }
}
