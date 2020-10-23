import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button
        (click)="auth.logout({ returnTo: document.location.origin })"
        mat-icon-button
      >
        <mat-icon aria-hidden="false" class="icon">exit_to_app</mat-icon>
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()" mat-icon-button>
        <mat-icon aria-hidden="false" class="icon">login</mat-icon>
      </button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}
}
