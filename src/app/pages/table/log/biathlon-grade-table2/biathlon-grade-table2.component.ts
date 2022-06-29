import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { SportsManEntity, FieldEntity } from 'src/app/entities';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-biathlon-grade-table2',
  templateUrl: './biathlon-grade-table2.component.html',
  styleUrls: ['./biathlon-grade-table2.component.scss']
})
export class BiathlonGradeTable2Component implements OnDestroy, OnInit {

  @Input()
  searchEvent!: Subject<{
    startDate: string | undefined,
    endDate: string | undefined,
    targetSportsManId?: SportsManEntity['id'],
    fieldId?: FieldEntity['id'],
  }>;

  pageSize$ = new BehaviorSubject(10)
  pageIndex$ = new BehaviorSubject(1)

  constructor(
    @Inject(HttpClient) private http: HttpClient,
  ) {
    this.pageIndex$.subscribe((x) => {
      console.log('index', x)
    })
  }
  ngOnInit(): void {
    const res$ = combineLatest([this.searchEvent, this.pageIndex$.pipe(tap((x) => console.log(2, x))), this.pageSize$.pipe(tap((x) => console.log(3, x)))]).pipe(
      switchMap(([search, index, size]) => this.http.post<{ data: any[], total: number }>(`api/biathlon-grade-table2`, {
        ...search,
        page: { index, size },
      })),
      shareReplay({ bufferSize: 1, refCount: true }),
    )
    this.data$ = res$.pipe(map((res) => res.data))
    this.total$ = res$.pipe(map((res) => res.total))
  }
  data$!: Observable<any[]>
  total$!: Observable<number>
  reset() {
  }
  ngOnDestroy() {
  }
}
