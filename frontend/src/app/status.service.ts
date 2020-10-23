import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  statuses = ['Published', 'Draft'];

  GetStatuses() {
    return this.statuses;
  }

  constructor() {}
}
