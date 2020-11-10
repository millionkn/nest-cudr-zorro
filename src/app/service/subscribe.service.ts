import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscribeService implements OnDestroy {
  private arr: any[] = [];
  save(...subscriptionArray: Subscription[]) {
    subscriptionArray.forEach((subscription) => {
      this.arr.push(() => subscription.unsubscribe());
    });
  }
  ngOnDestroy() {
    this.arr.forEach((fun) => fun());
  }
}
