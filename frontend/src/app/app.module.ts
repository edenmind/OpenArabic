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
import { TextComponent } from './text/text.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TextFormComponent } from './text-form/text-form.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
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

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    PageNotFoundComponent,
    TextFormComponent,
    FooterComponent,
    NavigationComponent,
    DashboardComponent,
    TextRowComponent,
    AuthButtonComponent,
    AboutComponent,
    UserProfileComponent,
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
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },
      { path: 'text-form/:id', component: TextFormComponent },
      { path: 'text/:id', component: TextComponent },
      { path: 'text-form', component: TextFormComponent },
      { path: 'texts', component: TextComponent },
      { path: 'category/:category', component: DashboardComponent },
      { path: 'author/:author', component: DashboardComponent },
      { path: '', component: DashboardComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
