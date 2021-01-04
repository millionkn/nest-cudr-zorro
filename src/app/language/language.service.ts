import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private current: '中文' | 'english' = '中文';
  private subject = new BehaviorSubject(this.current);
  ob$ = this.subject.asObservable();
  change(to: '中文' | 'english') {
    this.current = to;
    this.subject.next(this.current);
  }
}
