import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Text } from '../models/text';
import { DeviceService } from '../services/device.service';
import { TextService } from '../services/text.service';
import { WordProcessingService } from '../services/word-processing.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', '../shared/common.css'],
})
export class HomepageComponent implements OnInit {
  texts: Text[] = [];

  cols = 1;
  rows = 1;

  badgeHidden = false;
  showSpinner = true;

  pageNumber = 1;
  pageSize = 25;

  breakPoint = 1;
  readonly spinnerColor: ThemePalette = 'accent';
  pageTitle: string = String();

  constructor(
    private textService: TextService,
    private deviceService: DeviceService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private wordProcessingService: WordProcessingService
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    this.breakPoint = this.deviceService.checkDeviceSizeBreakPoint();

    const category = this.activeRoute.snapshot.paramMap.get('category') || null;
    const author = this.activeRoute.snapshot.paramMap.get('author') || null;

    if (category) {
      this.readCategory(category);
      this.titleService.setTitle(`English and Arabic Texts about: ${category}`);
      this.pageTitle = `Category: ${category}`;
    }
    else if (author) {
      this.readAuthor(author);
      this.titleService.setTitle(`English and Arabic Texts by: ${author}`);
      this.pageTitle = `Author: ${author}`;
    } else {
      this.readStartPage();
      this.titleService.setTitle('OpenArabic — a Bilingual Blog on Orthodox Islamic Topics');
    }
  }
  private readStartPage(): void {
    this.textService
      .getTexts('', '', this.pageSize, this.pageNumber)
      .subscribe((texts) => ((this.texts = texts), (this.showSpinner = false))
      );
  }

  private readAuthor(author: string): void {
    this.textService
      .getTexts(author, '', this.pageSize, this.pageNumber)
      .subscribe(
        (texts) => ((this.texts = texts), (this.showSpinner = false))
      );
  }

  private readCategory(category: string): void {
    this.textService
      .getTexts('', category, this.pageSize, this.pageNumber)
      .subscribe(
        (texts) => ((this.texts = texts), (this.showSpinner = false))
      );
  }

  public generateEnglishIngress(card: Text): string {

    let englishIngress: string = String();

    if (card.sentences) {
      card.sentences.forEach(item => {
        englishIngress = englishIngress + item.english;
      });
    }

    return this.wordProcessingService.insertSpaceAfterComma(englishIngress);
  }

  public generateArabicIngress(card: Text): string {

    let arabicIngress: string = String();

    if (card.sentences) {
      card.sentences.forEach(item => {
        arabicIngress = arabicIngress + item.arabic;
      });
    }

    return this.wordProcessingService.insertSpaceAfterComma(arabicIngress);
  }


  toggleBadgeVisibility(): void {
    this.badgeHidden = !this.badgeHidden;
  }

  openCard(id: number): void {
    this.route.navigate(['/text/', id]);
  }

  isStartPage = (): boolean => this.route.url === '/';

  onResize(event: { target: { innerWidth: number; }; }): void {
    this.breakPoint = event.target.innerWidth <= 1200 ? 1 : 3;
  }
}
