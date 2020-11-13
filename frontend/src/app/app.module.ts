import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { TextViewComponent } from './text-view/text-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TextEditComponent } from './text-edit/text-edit.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomepageComponent } from './homepage/homepage.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { TextRowComponent } from './text-row/text-row.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AboutComponent } from './about/about.component';
import { environment } from '../environments/environment';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AuthModule } from '@auth0/auth0-angular';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TextVocabularyComponent } from './text-vocabulary/text-vocabulary.component';

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
    AboutComponent,
    UserProfileComponent,
    TextVocabularyComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: 'dev-7yb6kp7f.eu.auth0.com',
      clientId: 'FG7Or6kDf25ovG6BxKKL77o0v3fmBRcU',

      // Request this audience at user authentication time
      audience: environment.audience,

      // Request this scope at user authentication time
      // scope: 'read:current_user',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-7yb6kp7f.eu.auth0.com/api/v2/' (note the asterisk)
            uri: environment.api + '/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: environment.audience,

              // The attached token should have these scopes
              // scope: 'read:current_user',
            },
          },
        ],
      },
    }),
    RouterModule.forRoot(
      [
        { path: 'about', component: AboutComponent },
        { path: 'text-edit/:id', component: TextEditComponent },
        { path: 'text/:id', component: TextViewComponent },
        { path: 'text-edit', component: TextEditComponent },
        { path: 'texts', component: TextViewComponent },
        { path: 'category/:category', component: HomepageComponent },
        { path: 'author/:author', component: HomepageComponent },
        { path: '', component: HomepageComponent },
        { path: '**', component: PageNotFoundComponent },
      ],
      { relativeLinkResolution: 'legacy' }
    ),
    HttpClientModule,
    DragDropModule,
    AppRoutingModule,
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
    MatSnackBarModule,
    TextFieldModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
