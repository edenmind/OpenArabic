import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { Text } from '../text';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  texts: Text[];
  cols = 1;
  rows = 1;
  hidden = false;

  showSpinner: boolean = true;
  pageNumber: number;
  pageSize: number;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(
    private textService: TextService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  author: string;
  category: string;
  subscription: Subscription;
  breakPoint: number;

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

  openCard(id: number): void {
    this.route.navigate(['/text/', id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onResize(event) {
    this.breakPoint = event.target.innerWidth <= 1200 ? 1 : 3;
  }
}
