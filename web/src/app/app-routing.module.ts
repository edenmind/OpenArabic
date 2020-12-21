import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TextEditComponent } from './text-edit/text-edit.component';
import { TextViewComponent } from './text-view/text-view.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'text-edit/:id', component: TextEditComponent },
  { path: 'text/:id', component: TextViewComponent },
  { path: 'text-edit', component: TextEditComponent },
  { path: 'texts', component: TextViewComponent },
  { path: 'category/:category', component: HomepageComponent },
  { path: 'author/:author', component: HomepageComponent },
  { path: '', component: HomepageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
