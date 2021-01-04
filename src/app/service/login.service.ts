import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ID } from '../utils/entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
  ) { }
  async login(username: string, password: string, base: 'biathlon' | 'skijump') {
    await this.http.post(`api/auth/login`, {
      username,
      password,
      base,
    }).toPromise();
  }
}
