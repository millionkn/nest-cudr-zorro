import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ID } from '../utils/entity';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginSubject = new ReplaySubject<{ id: ID }>(1);
  constructor(
    @Inject(SocketService) private socketService: SocketService,
  ) { }
  login(username: string, password: string) {
    return this.socketService.send<{ id: ID }>(`operatorLogin`, {
      username,
      password,
    }).subscribe(this.loginSubject);
  }
  readonly login$ = this.loginSubject.asObservable();
}
