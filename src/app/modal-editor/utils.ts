import { Observable } from 'rxjs';

export type Editor<V, P> = {
  value: V;
  setParams(params: P): void;
  newValue: Observable<void>
};
