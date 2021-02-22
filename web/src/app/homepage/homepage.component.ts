import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoints } from '../enums/endpoints.enum';
import { UI } from '../enums/ui.enum';
import { Changelog } from '../models/changelog';
import { Text } from '../models/text';
import { WordOfTheDay } from '../models/wordoftheday';
import { ChangelogService } from '../services/changelog.service';
import { DeviceService } from '../services/device.service';
import { TextService } from '../services/text.service';
import { WordOfTheDayService } from '../services/wordoftheday.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'bottom-sheet-share',
  templateUrl: './bottom-sheet-share.html',
  styleUrls: ['../shared/common.css'],
})
export class BottomSheetShare {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetShare>) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
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

  pageSize = "7";
  length = "1";
  pageIndex = "0";

  breakPoint = 1;
  readonly spinnerColor: ThemePalette = 'accent';
  pageTitle: string = String();

  changelog: Changelog[] = [];
  wordoftheday: WordOfTheDay = new WordOfTheDay;

  constructor(
    private bottomSheet: MatBottomSheet,
    private textService: TextService,
    private changelogService: ChangelogService,
    private wordOfTheDayService: WordOfTheDayService,
    private deviceService: DeviceService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.breakPoint = this.deviceService.checkDeviceSizeBreakPoint();
    this.changePage(0);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetShare);
  }

  public changePage(pageIndex: number) {


    this.showSpinner = true;

    const category = this.activeRoute.snapshot.paramMap.get(Endpoints.Category)!;
    const author = this.activeRoute.snapshot.paramMap.get(Endpoints.Author)!;

    if (category) {
      this.readCategory(category, pageIndex.toString());
      this.titleService.setTitle(`English and Arabic Texts about: ${category}`);
      this.pageTitle = `Category: ${category}`;
    }
    else if (author) {
      this.readAuthor(author, pageIndex.toString());
      this.titleService.setTitle(`English and Arabic Texts by: ${author}`);
      this.pageTitle = `Author: ${author}`;
    } else {
      this.readStartPage(pageIndex.toString());
      this.titleService.setTitle(UI.PageName);
    }

    this.pageIndex = pageIndex.toString();
    pageIndex++
  }


  private readStartPage(pageIndex: string): void {
    this.textService
      .getTextsFromRoot(this.pageSize, pageIndex)
      .subscribe(texts => (
        this.texts = texts.body!,
        this.length = texts.headers.get("x-total-count")!,
        this.showSpinner = false)
      );

    this.changelogService
      .GetChangelog()
      .subscribe(changelog => (this.changelog = changelog));

    this.wordOfTheDayService
      .GetWordOfTheDay()
      .subscribe(wordoftheday => (this.wordoftheday = wordoftheday));
  }

  private readAuthor(author: string, pageIndex: string): void {
    this.textService
      .getTextsFromEndpoint(Endpoints.Author, author, pageIndex, this.pageSize)
      .subscribe(texts => (
        this.texts = texts.body!,
        this.length = texts.headers.get("x-total-count")!,
        this.showSpinner = false)
      );
  }

  private readCategory(category: string, pageIndex: string): void {
    this.textService
      .getTextsFromEndpoint(Endpoints.Category, category, pageIndex, this.pageSize)
      .subscribe(texts => (
        this.texts = texts.body!,
        this.length = texts.headers.get("x-total-count")!,
        this.showSpinner = false)
      );
  }

  toggleBadgeVisibility(): void {
    this.badgeHidden = !this.badgeHidden;
  }

  openCard(id: number): void {
    this.route.navigate(['/text/', id]);
  }

  isStartPage = (): boolean => this.route.url === Endpoints.Root;

  onResize(event: { target: { innerWidth: number; }; }): void {
    this.breakPoint = event.target.innerWidth <= 1200 ? 1 : 3;
  }
}
