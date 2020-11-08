import { Component, OnInit } from '@angular/core';
import { TextService } from '../services/text.service';
import { Text } from '../models/text';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemePalette } from '@angular/material/core';

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
  spinnerColor: ThemePalette = 'accent';

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

  generateEnglishIngress(card: Text): string {
    var englishIngress: string = '';
    if (card.sentences) {
      for (let index = 0; index < card.sentences.length; index++) {
        englishIngress = englishIngress + card.sentences[index].english;
      }
    }
    return englishIngress;
  }

  generateArabicIngress(card: Text): string {
    var arabicIngress: string = '';
    if (card.sentences) {
      for (let index = 0; index < card.sentences.length; index++) {
        arabicIngress = arabicIngress + card.sentences[index].arabic;
      }
    }

    return arabicIngress;
  }

  toggleBadgeVisibility() {
    this.badgeHidden = !this.badgeHidden;
  }

  openCard(id: number): void {
    this.route.navigate(['/text/', id]);
  }

  isStartPage(): boolean {
    return this.route.url == '/';
  }

  onResize(event) {
    this.breakPoint = event.target.innerWidth <= 1200 ? 1 : 3;
  }
}
