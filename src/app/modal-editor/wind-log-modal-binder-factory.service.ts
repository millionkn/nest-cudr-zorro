import { Injectable, Inject, Injector, Type } from '@angular/core';
import { ModalEditorService } from './modal-editor.service';
import { BaseEntity, Entity } from '../utils/entity';
import { HttpClient } from '@angular/common/http';
import { loadDecoratorData } from '../utils/decorator';
import { BehaviorSubject, Observable, of, OperatorFunction } from 'rxjs';
import { share, tap, combineLatest, mergeMap, map, zip, debounceTime, concatMap } from 'rxjs/operators';
import { QueryOption, JsonQueryService } from '../service/json-query.service';
import { WindLogEntity, FieldEntity } from '../entities';

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
export class WindLogModalBinderFactoryService {
  constructor(
    @Inject(ModalEditorService) private editorService: ModalEditorService,
    @Inject(HttpClient) private http: HttpClient,
  ) { }
  create<E extends BaseEntity, To>(
    klass: Type<E>,
    injector: Injector,
    requestBody$: Observable<{
      targetFieldId: FieldEntity['id'],
      startDate: Date | undefined,
      endDate: Date | undefined,
    }>,
  ) {
    const editorService = this.editorService;
    const http = this.http;
    const loading$ = new BehaviorSubject(false);
    const pageIndex$ = new BehaviorSubject(1);
    const pageSize$ = new BehaviorSubject(10);

    const request$ = requestBody$.pipe(
      tap(() => pageIndex$.next(1)),
      combineLatest(pageIndex$, pageSize$),
      tap(() => loading$.next(true)),
      debounceTime(100),
      concatMap(async ([args, pageIndex, pageSize]) => {
        return await this.http.post<{ data: WindLogEntity[], total: number }>(`api/query-wind-log`, {
          pageIndex,
          pageSize,
          fieldId: args.targetFieldId,
          startDate: args.startDate,
          endDate: args.endDate,
        }).toPromise();
      }),
      tap(() => loading$.next(false)),
      share(),
    );
    const ret = {
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
        await http.post(`cudr/transaction`, [
          {
            type: 'delete',
            entityName: loadDecoratorData(Entity, klass),
            ids: [entity.id],
          }
        ]).toPromise();
        loading$.next(false);
        pageIndex$.next(1);
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
