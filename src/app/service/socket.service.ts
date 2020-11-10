import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, Observable, Observer, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private emitEvent = new Subject<{
    event: string,
    arg: any,
    callback?: (res: any) => any,
  }>();
  private socket = io();
  emit(event: string, arg: { [key: string]: any }) {
    this.socket.emit(event, arg);
  }
  send<R>(event: string, arg: { [key: string]: any }) {
    return from(new Promise<R>((res) => {
      this.socket.emit(event, arg, (ret: { data: R }) => res(ret.data));
    }));
  }
  on<R>(event: string): Observable<R> {
    const subject = new Subject<any>();
    let count = 0;
    const fun = (args: any) => subject.next(args);
    const observable: Observable<{ data: any }> = Observable.create((observer: Observer<any>) => {
      if (count < 0) { throw new Error(); }
      if (count === 0) {
        this.socket.on(event, fun);
      }
      count += 1;
      const sub = subject.subscribe(observer);
      return () => {
        if (count <= 0) { throw new Error(); }
        count -= 1;
        if (count === 0) { this.socket.off(event, fun); }
        sub.unsubscribe();
      };
    });
    return observable.pipe(map(({ data }) => data));
  }
  watch<R>(event: string, arg: { [key: string]: any }) {
    const sid = `${Math.random()}`;
    const ret = this.on<R>(`${event}?sid=${sid}`);
    this.emit(event, { sid, data: arg });
    return ret;
  }
  ngOnDestroy() {
    this.emitEvent.complete();
  }
}
