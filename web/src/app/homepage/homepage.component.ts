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

  cols: number = 1;
  rows: number = 1;

  badgeHidden: boolean = false;
  showSpinner: boolean = true;

  pageNumber: number = 1;
  pageSize: number = 100;

  breakPoint: number = 1;
  spinnerColor: ThemePalette = 'accent';
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

    const category = this.activeRoute.snapshot.paramMap.get('category') || '';
    const author = this.activeRoute.snapshot.paramMap.get('author') || '';

    if (category) {
      this.readCategory(category);
      this.titleService.setTitle(`English and Arabic Texts about: ${category}`);
      this.pageTitle = `Category: ${category}`
    }
    else if (author) {
      this.readAuthor(author);
      this.titleService.setTitle(`English and Arabic Texts by: ${author}`);
      this.pageTitle = `Author: ${author}`
    } else {
      this.readStartPage();
      this.titleService.setTitle('OpenArabic — a Bilingual Blog on Orthodox Islamic Topics');
      this.pageTitle = 'Homepage'
    }
  }
  private readStartPage() {
    this.textService
      .getTexts('', '', this.pageSize, this.pageNumber)
      .subscribe((texts) => ((this.texts = texts), (this.showSpinner = false)));
  }

  private readAuthor(author: string) {
    this.textService
      .getTexts(author, 'empty', this.pageSize, this.pageNumber)
      .subscribe(
        (texts) => ((this.texts = texts), (this.showSpinner = false))
      );
  }

  private readCategory(category: string) {
    this.textService
      .getTexts('empty', category, this.pageSize, this.pageNumber)
      .subscribe(
        (texts) => ((this.texts = texts), (this.showSpinner = false))
      );
  }

  generateEnglishIngress(card: Text): string {

    let englishIngress: string = String();

    if (card.sentences) {
      for (let index = 0; index < card.sentences.length; index++) {
        englishIngress = englishIngress + card.sentences[index].english;
      }
    }

    const englishIngressWithSpaceAfterComma = this.wordProcessingService.insertSpaceAfterComma(englishIngress);

    return englishIngressWithSpaceAfterComma;
  }

  generateArabicIngress(card: Text): string {

    let arabicIngress: string = String();

    if (card.sentences) {
      for (let index = 0; index < card.sentences.length; index++) {
        arabicIngress = arabicIngress + card.sentences[index].arabic;
      }
    }

    const arabicIngressWithSpacesAfterComma = this.wordProcessingService.insertSpaceAfterComma(arabicIngress);

    return arabicIngressWithSpacesAfterComma;
  }


  toggleBadgeVisibility(): void {
    this.badgeHidden = !this.badgeHidden;
  }

  openCard(id: number): void {
    this.route.navigate(['/text/', id]);
  }

  isStartPage(): boolean {
    return this.route.url == '/';
  }

  onResize(event: { target: { innerWidth: number; }; }) {
    this.breakPoint = event.target.innerWidth <= 1200 ? 1 : 3;
  }
}
