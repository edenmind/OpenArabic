import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BottomSheetShare } from "./homepage/bottom-sheet-share.component";
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TextEditComponent } from './text/edit/text-edit.component';
import { TextRowComponent } from './text/row/text-row.component';
import { TextViewComponent } from './text/view/text-view.component';
import { TextVocabularyComponent } from './text/vocabulary/text-vocabulary.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { IssuesComponent } from './issues/issues.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';




@NgModule({
  declarations: [
    AppComponent,
    TextViewComponent,
    PageNotFoundComponent,
    TextEditComponent,
    FooterComponent,
    NavigationComponent,
    HomepageComponent,
    TextRowComponent,
    AuthButtonComponent,
    BottomSheetShare,
    AboutComponent,
    UserProfileComponent,
    TextVocabularyComponent,
    ContactComponent,
    LoginComponent,
    IssuesComponent,
  ],
  imports: [
    BrowserModule,
    NgxGoogleAnalyticsModule.forRoot('G-00Q1GM3YQP'),
    AuthModule.forRoot({
      domain: 'dev-7yb6kp7f.eu.auth0.com',
      clientId: 'FG7Or6kDf25ovG6BxKKL77o0v3fmBRcU',
      audience: environment.audience,
      httpInterceptor: {
        allowedList: [
          {
            uri: environment.api + '/*',
            tokenOptions: {
              audience: environment.audience,
            },
          },
        ],
      },
    }),
    RouterModule,
    HttpClientModule,
    DragDropModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatRippleModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    TextFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatBottomSheetModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
