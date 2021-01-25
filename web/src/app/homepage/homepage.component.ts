import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoints } from '../enums/endpoints.enum';
import { UI } from '../enums/ui.enum';
import { Text } from '../models/text';
import { DeviceService } from '../services/device.service';
import { TextService } from '../services/text.service';

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
  pageSize = 15;
  pageIndex = "1";

  breakPoint = 1;
  readonly spinnerColor: ThemePalette = 'accent';
  pageTitle: string = String();

  constructor(
    private textService: TextService,
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

  public changePage(pageIndex: number) {

    this.texts = [];
    this.showSpinner = true;

    pageIndex++;
    this.pageIndex = pageIndex.toString();

    const category = this.activeRoute.snapshot.paramMap.get(Endpoints.Category)!;
    const author = this.activeRoute.snapshot.paramMap.get(Endpoints.Author)!;

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
      this.titleService.setTitle(UI.PageName);
    }
  }


  private readStartPage(): void {
    this.textService
      .getTextsFromRoot(this.pageSize, this.pageIndex)
      .subscribe(texts => (
        this.texts = texts.body!,
        this.pageIndex = texts.headers.get("x-total-count")!,
        this.showSpinner = false)
      );
  }

  private readAuthor(author: string): void {
    this.textService
      .getTextsFromEndpoint(Endpoints.Author, author, this.pageSize, this.pageIndex)
      .subscribe(texts => (
        this.texts = texts.body!,
        this.pageIndex = texts.headers.get("x-total-count")!,
        this.showSpinner = false)
      );
  }

  private readCategory(category: string): void {
    this.textService
      .getTextsFromEndpoint(Endpoints.Category, category, this.pageSize, this.pageIndex)
      .subscribe(texts => (
        this.texts = texts.body!,
        this.pageIndex = texts.headers.get("x-total-count")!,
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
