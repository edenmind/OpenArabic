import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: ` <mat-list *ngIf="auth.user$ | async as user">
    <mat-list-item>{{ user.email }}</mat-list-item>
  </mat-list>`,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
