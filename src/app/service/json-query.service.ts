import { Injectable, Inject, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadDecoratorData } from '../utils/decorator';
import { Entity } from '../modal-editor/decorators';
import { BaseEntity, ID, DateString } from '../utils/entity';

export type QueryOption<T extends BaseEntity<any>> = {
  [key in Extract<keyof T, string>]?
  : T[key] extends ID<any> ? { ''?: { in?: T['id'][] } }
  : T[key] extends BaseEntity<any> ? QueryOption<T[key]> & { ''?: { isNull?: boolean } }
  : T[key] extends Array<infer X> ? X extends BaseEntity<any> ? QueryOption<X> & { ''?: { isEmpty?: boolean } } : never
  : T[key] extends DateString ? { ''?: { ''?: { sortIndex?: number }, isNull?: boolean, lessOrEqual?: string, moreOrEqual?: string } }
  : T[key] extends string ? { ''?: { ''?: { sortIndex?: number }, like?: string, equal?: string } }
  : T[key] extends number ? { ''?: { ''?: { sortIndex?: number }, lessOrEqual?: number, moreOrEqual?: number } }
  : T[key] extends boolean ? { ''?: { equal: boolean } }
  : never
};

@Injectable({
  providedIn: 'root'
})
export class JsonQueryService {

  constructor(
    @Inject(HttpClient) private http: HttpClient,
  ) { }

  query<T extends BaseEntity<any>>(
    klass: Type<T>,
    query: {
      where: QueryOption<T>,
      pageIndex?: number,
      pageSize?: number,
    }
  ) {
    const klassName = loadDecoratorData(Entity, klass);
    const queryBody: any = {};
    queryBody.where = query.where;
    if (query.pageIndex !== undefined) { queryBody.pageIndex = query.pageIndex; }
    if (query.pageSize !== undefined) { queryBody.pageSize = query.pageSize; }
    return this.http.post<{ data: T[], total: number }>(`cudr/${klassName}/findEntityList`, queryBody).toPromise();
  }
}
