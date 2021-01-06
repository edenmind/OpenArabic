import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }
  public checkDeviceSizeBreakPoint(): number {
    return window.innerWidth <= 1200 ? 1 : 3;
  }
}
