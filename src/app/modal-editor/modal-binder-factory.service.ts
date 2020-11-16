import { Injectable, Inject, Injector, Type } from '@angular/core';
import { ModalEditorService } from './modal-editor.service';
import { BaseEntity, Entity } from '../utils/entity';
import { HttpClient } from '@angular/common/http';
import { loadDecoratorData } from '../utils/decorator';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { share, tap, combineLatest, mergeMap, map, zip, debounceTime } from 'rxjs/operators';
import { QueryOption, JsonQueryService } from '../service/json-query.service';

type Binder<E, To> = {
  needRefresh$: BehaviorSubject<null>,
  data$: Observable<To[]>,
  loading$: Observable<boolean>,
  total$: Observable<number>,
  editHandler(entity?: E | undefined): Promise<void>,
  deleteHandler(entity: E): Promise<void>,
  pageIndexChangeHandler(index: number): boolean,
  pageSizeChangeHandler(size: number): boolean,
};

@Injectable()
export class ModalBinderFactoryService {
  constructor(
    @Inject(ModalEditorService) private editorService: ModalEditorService,
    @Inject(HttpClient) private http: HttpClient,
    @Inject(JsonQueryService) private jsonQuery: JsonQueryService,
  ) { }
  create<E extends BaseEntity>(
    klass: Type<E>,
    injector: Injector,
    where$OrWhere: QueryOption<E> | Observable<QueryOption<E>>,
  ): Binder<E, E>;
  create<E extends BaseEntity, To>(
    klass: Type<E>,
    injector: Injector,
    where$OrWhere: QueryOption<E> | Observable<QueryOption<E>>,
    fun: OperatorFunction<E[], To[]>,
  ): Binder<E, To>;
  create<E extends BaseEntity, To>(
    klass: Type<E>,
    injector: Injector,
    where$OrWhere: QueryOption<E> | Observable<QueryOption<E>>,
    fun: OperatorFunction<E[], To[]> = (source) => source as unknown as Observable<To[]>,
  ) {
    const where$ = where$OrWhere instanceof Observable ? where$OrWhere : of(where$OrWhere);
    const jsonQuery = this.jsonQuery;
    const editorService = this.editorService;
    const http = this.http;
    const loading$ = new BehaviorSubject(false);
    const pageIndex$ = new BehaviorSubject(1);
    const pageSize$ = new BehaviorSubject(10);
    const needRefresh$ = new BehaviorSubject<null>(null);
    // @ts-ignore
    const request$ = where$.pipe(
      tap(() => pageIndex$.next(1)),
      combineLatest(pageIndex$, pageSize$, needRefresh$),
      tap(() => loading$.next(true)),
      debounceTime(100),
      mergeMap(async ([where, pageIndex, pageSize]) => {
        return await jsonQuery.query(klass, {
          where: where as any,
          pageIndex,
          pageSize,
        });
      }),
      share(),
      (source) => source.pipe(
        map(({ total }) => total),
        zip(
          source.pipe(
            map(({ data }) => data),
            (s2) => fun(s2),
          )
        ),
        map(([total, data]) => ({ total, data }))
      ),
      tap(() => loading$.next(false)),
      share(),
    );
    const ret = {
      needRefresh$,
      data$: request$.pipe(
        map(({ data }) => data),
      ),
      loading$: loading$.asObservable(),
      total$: request$.pipe(
        map(({ total }) => total),
      ),
      async editHandler(entity?: E) {
        try {
          await editorService.showEditor(injector, entity || new klass(), klass, async (copy) => {
            try {
              await http.post(`cudr/transaction`, [
                {
                  type: 'save',
                  entityName: loadDecoratorData(Entity, klass),
                  entity: copy,
                }
              ]).toPromise();
              pageIndex$.next(1);
              return true;
            } catch (e) {
              return false;
            }
          });
        } catch (e) {
        }
      },
      async deleteHandler(entity: E) {
        loading$.next(true);
        await http.post(`cudr/transtroctor`, [
          {
            type: 'delete',
            entityName: loadDecoratorData(Entity, klass),
            ids: [entity.id],
          }
        ]).toPromise();
        loading$.next(false);
        needRefresh$.next(null);
      },
      pageIndexChangeHandler(index: number) {
        setTimeout(() => {
          pageIndex$.next(index);
        }, 0);
        return true;
      },
      pageSizeChangeHandler(size: number) {
        setTimeout(() => {
          pageSize$.next(size);
        }, 0);
        return true;
      }
    };
    return ret;
  }
}
