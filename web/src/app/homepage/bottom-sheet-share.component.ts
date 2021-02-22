import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';



@Component({
  selector: 'bottom-sheet-share',
  templateUrl: './bottom-sheet-share.component.html',
  styleUrls: ['../shared/common.css'],
})
export class BottomSheetShare {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetShare>) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
