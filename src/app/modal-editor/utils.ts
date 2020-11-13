import { Observable } from 'rxjs';

export type Editor<V, P> = {
  beforeSave?: () => (void | Promise<void>),
  value: V;
  setParams(params: P): void;
  newValue: Observable<void>
};
