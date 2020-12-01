import { EventEmitter, Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  menuState$: Subject<string> = new Subject();
  public eventmit: any;
  constructor() {
    this.eventmit = new ReplaySubject(1);
  }

  IsNullOrEmpty(value: any): boolean {
    if (value == null || value === '' || value === undefined) {
      return true;
    }
    return false;
  }


  trimEnd(str: string, char: string): string {
    if (char == null || char === '' || char === undefined) {
      return str;
    } else {
      const rg: RegExp = new RegExp(char);
      let i: number = str.length;
      while (rg.test(str.charAt(--i))) {
        ;
      }
      return str.slice(0, i + 1);
    }
  }

  getNewGUIDString() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now();
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r: number;
      r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
