import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private readonly statuses = ['Published', 'Draft'];

  GetStatuses(): string[] {
    return this.statuses.sort();
  }

  constructor() { }
}
