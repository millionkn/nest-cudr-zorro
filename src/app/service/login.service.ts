import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

type Base = 'skijump' | 'biathlon' | 'free_skijump'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(Router) private router: Router,
  ) {
  }
  base: Base = window.localStorage.getItem('myvbase') as any || 'skijump'
  async login(username: string, password: string, base: Base) {
    await this.http.post(`api/auth/login`, {
      username,
      password,
      base,
    }).toPromise();
    this.base = base
    window.localStorage.setItem('myvbase', base)
  }

  gradeRoute() {
    if (this.base === 'free_skijump') {
      return `log/自由滑雪`
    } else if (this.base === 'skijump') {
      return `log/滑雪成绩`
    } else {
      return `log/冬季两项`
    }
  }

  toGradePage(params: { [key: string]: string }) {
    if (this.base === 'free_skijump') {
      this.router.navigate(['/table', 'skijump', 'log', '自由滑雪'], { queryParams: params })
    } else if (this.base === 'skijump') {
      this.router.navigate(['/table', 'skijump', 'log', '滑雪成绩'], { queryParams: params })
    } else {
      this.router.navigate(['/table', 'biathlon', 'log', '冬季两项'], { queryParams: params })
    }
  }

  windLog1() {
    return this.base === 'biathlon' || this.base === 'skijump'
  }
  windLog2() {
    return this.base === 'free_skijump'
  }

  count$() {
    return this.http.post<{
      场地数量: number;
      数据总量: number;
      风场记录时长: number;
      训练记录数量: {
        biathlon: number,
        skijump: number,
        freeSkijump: number,
      };
    }>(`/api/home/count`, {}).pipe(
      map((raw) => {
        let count4
        if (this.base === 'biathlon') {
          count4 = raw.训练记录数量.biathlon
        } else if (this.base === 'free_skijump') {
          count4 = raw.训练记录数量.freeSkijump
        } else if (this.base === 'skijump') {
          count4 = raw.训练记录数量.skijump
        } else {
          throw new Error()
        }
        return {
          ...raw,
          训练记录数量: count4,
        }
      })
    )
  }
}
