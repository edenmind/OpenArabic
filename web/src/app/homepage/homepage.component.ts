import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Text } from '../models/text';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', '../shared/common.css'],
})
export class HomepageComponent implements OnInit {
  texts: Text[];

  cols: number = 1;
  rows: number = 1;

  badgeHidden: boolean = false;
  showSpinner: boolean = true;

  pageNumber: number;
  pageSize: number = 35;

  author: string;
  category: string;
  subscription: Subscription;

  breakPoint: number;
  spinnerColor: ThemePalette = 'accent';

  constructor(
    private textService: TextService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    console.log('reloading...');
    this.breakPoint = window.innerWidth <= 1200 ? 1 : 3;

    this.category = this.activeRoute.snapshot.paramMap.get('category');
    this.author = this.activeRoute.snapshot.paramMap.get('author');

    if (this.category) {
      //set title
      this.titleService.setTitle(
        'English and Arabic Texts about: ' + this.category
      );
      //show categories
      this.subscription = this.textService
        .getTexts('empty', this.category, this.pageSize, this.pageNumber)
        .subscribe(
          (texts) => ((this.texts = texts), (this.showSpinner = false))
        );
    } else if (this.author) {
      //set title
      this.titleService.setTitle('English and Arabic Texts by: ' + this.author);
      //show authors
      this.subscription = this.textService
        .getTexts(this.author, 'empty', this.pageSize, this.pageNumber)
        .subscribe(
          (texts) => ((this.texts = texts), (this.showSpinner = false))
        );
    } else {
      this.titleService.setTitle(
        'Open Arabic — a bilingual blog for orthodox Islamic topics'
      );
      //show everything
      this.subscription = this.textService
        .getTexts('empty', 'empty', this.pageSize, this.pageNumber)
        .subscribe(
          (texts) => ((this.texts = texts), (this.showSpinner = false))
        );
    }
  }

  getCurrentPage(): string {
    var currentPage: string;
    if (this.activeRoute.snapshot.paramMap.get('category')) {
      currentPage =
        'Category: ' + this.activeRoute.snapshot.paramMap.get('category');
    }
    if (this.activeRoute.snapshot.paramMap.get('author')) {
      currentPage =
        'Author: ' + this.activeRoute.snapshot.paramMap.get('author');
    }

    return currentPage;
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
    englishIngress = this.insertSpaceAfterComma(englishIngress);

    return englishIngress;
  }

  generateArabicIngress(card: Text): string {
    var arabicIngress: string = '';
    if (card.sentences) {
      for (let index = 0; index < card.sentences.length; index++) {
        arabicIngress = arabicIngress + card.sentences[index].arabic;
      }
    }

    arabicIngress = this.insertSpaceAfterComma(arabicIngress);

    return arabicIngress;
  }
  insertSpaceAfterComma(englishIngress: string) {
    return englishIngress.replace(/,(?=[^\s])/g, ', ');
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
