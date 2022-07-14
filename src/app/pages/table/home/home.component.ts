import { Component, Inject, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, from, Subject, timer } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { JsonQueryService } from 'src/app/service/json-query.service';
import { AnemometerEntity, FieldEntity } from 'src/app/entities';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(LoginService) private loginServ: LoginService,
    @Inject(JsonQueryService) private jsonQuery: JsonQueryService,
  ) {

    this.chart3FieldArr$.subscribe((arr) => {
      if (arr.length > 0) {
        this.chart3FieldId$.next(arr[0].id)
      }
    })
    this.chart3AnemometerArr$.subscribe((arr) => {
      if (arr.length > 0) {
        this.chart3AnemometerId$.next(arr[0].id)
      }
    })
  }
  @ViewChild('chart11')
  chart11!: ElementRef<HTMLDivElement>;
  @ViewChild('chart12')
  chart12!: ElementRef<HTMLDivElement>;
  @ViewChild('chart13')
  chart13!: ElementRef<HTMLDivElement>;
  @ViewChild('chart14')
  chart14!: ElementRef<HTMLDivElement>;
  @ViewChild('chart2')
  chart2!: ElementRef<HTMLDivElement>;
  @ViewChild('chart3')
  chart3!: ElementRef<HTMLDivElement>;
  private dispose$ = new Subject<null>()
  private count$ = this.loginServ.count$()

  count1$ = this.count$.pipe(map((e) => e.场地数量))
  count2$ = this.count$.pipe(map((e) => e.数据总量))
  count3$ = this.count$.pipe(map((e) => e.风场记录时长 / 60 / 60))
  count4$ = this.count$.pipe(map((e) => e.训练记录数量))

  private chart2$ = this.http.post<{
    name: string;
    value: number;
  }[]>(`/api/home/chart2`, {}).pipe(
    shareReplay({ refCount: true, bufferSize: 1 }),
    takeUntil(this.dispose$),
  )

  ngOnDestroy() {
    this.dispose$.next(null)
  }
  ngOnInit(): void {
    this.chart3AnemometerId$.pipe(
      switchMap((id) => this.http.post<{ startDate: string, endDate: string }>(`api/anemometer/range`, { id }))
    ).subscribe((res) => {
      this.chart3Date$.next([dayjs(res.startDate).toDate(), dayjs(res.endDate).toDate()])
    })
  }

  gradeType = this.loginServ.base

  async ngAfterViewInit() {
    const dispose = [] as (() => void)[]
    if (this.chart11?.nativeElement) {
      const element = this.chart11.nativeElement
      const chart = echarts.init(element);
      const handler = () => chart.resize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
      dispose.push(() => {
        chart.dispose()
        window.removeEventListener(`resize`, handler)
      })
      window.addEventListener(`resize`, handler)
      this.http.post<{
        sportsManName: string;
        value: number;
      }[]>('api/home/chart1-1', {}).subscribe((arr) => {
        chart.setOption({
          grid: {
            top: '2%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: arr.map((e) => e.sportsManName),
            axisLabel: {
              interval: 0,
              rotate: 30
            },
          },
          yAxis: {
            type: 'value',
            name: `命中率(%)`,
          },
          series: [
            {
              data: arr.map((e) => e.value),
              barMinHeight: 1,
              type: 'bar'
            }
          ]
        })
        handler()
      })
    }
    if (this.chart12?.nativeElement) {
      const element = this.chart12.nativeElement
      const chart = echarts.init(element);
      const handler = () => chart.resize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
      dispose.push(() => {
        chart.dispose()
        window.removeEventListener(`resize`, handler)
      })
      window.addEventListener(`resize`, handler)
      this.http.post<{
        sportsManName: string;
        value: number;
      }[]>('api/home/chart1-2', {}).subscribe((arr) => {
        chart.setOption({
          grid: {
            top: '2%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: arr.map((e) => e.sportsManName),
            axisLabel: {
              interval: 0,
              rotate: 30
            },
          },
          yAxis: {
            type: 'value',
            name: `平均距离(米)`,
          },
          series: [
            {
              data: arr.map((e) => e.value),
              barMinHeight: 1,
              type: 'bar'
            }
          ]
        })
        handler()
      })
    }
    if (this.chart13?.nativeElement) {
      const element = this.chart13.nativeElement
      const chart = echarts.init(element);
      const handler = () => chart.resize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
      dispose.push(() => {
        chart.dispose()
        window.removeEventListener(`resize`, handler)
      })
      window.addEventListener(`resize`, handler)
      timer(500).subscribe(() => {
        chart.setOption({
          grid: {
            top: '2%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: [`齐广璞`, `贾宗洋`, `王心迪`, `孙佳旭`],
            axisLabel: {
              interval: 0,
              rotate: 30
            },
          },
          yAxis: {
            max: (val: { max: number, min: number }) => val.max * 2,
            interval: 30,
            type: 'value',
            name: `得分`,
          },
          series: [
            {
              data: [127.88, 125.67, 114.60, 85.40],
              barMinHeight: 1,
              type: 'bar'
            },
            {
              data: [125.22, 123.45, 98.19, 110.86],
              barMinHeight: 1,
              type: 'bar'
            },
            {
              data: [114.48, 88.69, null, null],
              barMinHeight: 1,
              type: 'bar'
            },
            {
              data: [129.00, null, null, null],
              barMinHeight: 1,
              markPoint: {
                label: {
                  formatter: () => `冠军`
                },
                data: [
                  { type: 'max' }
                ]
              },
              type: 'bar'
            },
          ]
        })
        handler()
      })
    }
    if (this.chart14?.nativeElement) {
      const element = this.chart14.nativeElement
      const chart = echarts.init(element);
      const handler = () => chart.resize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
      dispose.push(() => {
        chart.dispose()
        window.removeEventListener(`resize`, handler)
      })
      window.addEventListener(`resize`, handler)
      timer(500).subscribe(() => {
        chart.setOption({
          grid: {
            top: '2%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: [`徐梦桃`, `孔凡钰`, `邵琪`],
            axisLabel: {
              interval: 0,
              rotate: 30
            },
          },
          yAxis: {
            max: (val: { max: number, min: number }) => val.max * 2,
            interval: 30,
            type: 'value',
            name: `得分`,
          },
          series: [
            {
              data: [101.10, 83.78, 77.49],
              barMinHeight: 1,
              type: 'bar'
            },
            {
              data: [103.89, 81.99, 54.90],
              barMinHeight: 1,
              type: 'bar'
            },
            {
              markPoint: {
                label: {
                  formatter: () => `冠军`
                },
                data: [
                  { type: 'max' }
                ]
              },
              data: [108.61, 102.71, null],
              barMinHeight: 1,
              type: 'bar'
            },
            {
              data: [null, 62.24, null],
              barMinHeight: 1,
              type: 'bar'
            },
            {
              data: [null, 59.67, null],
              barMinHeight: 1,
              type: 'bar'
            },
          ]
        })
        handler()
      })
    }
    if (this.chart2.nativeElement) {
      const element = this.chart2.nativeElement
      const chart = echarts.init(element);
      const handler = () => chart.resize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
      dispose.push(() => {
        chart.dispose()
        window.removeEventListener(`resize`, handler)
      })
      window.addEventListener(`resize`, handler)
      this.chart2$.subscribe((arr) => {
        chart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: '70%',
              data: arr,
              label: {
                normal: {
                  formatter: '{b}:{d}%'
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
        handler()
      })
    }
    if (this.chart3.nativeElement) {
      const element = this.chart3.nativeElement
      const chart = echarts.init(element);
      const handler = () => chart.resize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
      dispose.push(() => {
        chart.dispose()
        window.removeEventListener(`resize`, handler)
      })
      window.addEventListener(`resize`, handler)
      combineLatest([
        this.chart3AnemometerId$,
        this.chart3Date$,
      ]).pipe(
        debounceTime(1000),
        switchMap(([anemometerId, [startDate, endDate]]) => this.http.post<{ date: string, value: number | null }[]>(`api/home/anemometer-chart`, {
          anemometerId,
          startDate: dayjs(startDate).startOf('d').toDate(),
          endDate: dayjs(endDate).endOf('d').toDate(),
        })),
        takeUntil(this.dispose$),
      ).subscribe(async (arr) => {
        chart.setOption({
          grid: {
            top: '2%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'time',
            axisLabel: {
              fontSize: 16,
              formatter: (str: string) => dayjs(str).format('YYYY-MM-DD HH:mm:ss')
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: arr.map((e) => [e.date, e.value]),
              type: 'line',
              symbol: 'none',
              smooth: 0.7
            }
          ]
        })
        handler()
      })
    }
    this.dispose$.subscribe(() => {
      dispose.forEach((fun) => fun())
    })
  }

  chart3FieldArr$ = from(this.jsonQuery.query(FieldEntity, { where: {} })).pipe(
    map(({ data }) => data.map((e) => ({ id: e.id, name: e.名称 }))),
  )
  chart3FieldId$ = new BehaviorSubject<null | string>(null)
  chart3AnemometerArr$ = this.chart3FieldId$.pipe(
    switchMap((fieldId) => this.jsonQuery.query(AnemometerEntity, { where: { 赛场: { id: { '': { in: fieldId ? [fieldId as any] : undefined } } } } })),
    map(({ data }) => data.map((e) => ({ id: e.id, name: e.编号 }))),
  )
  chart3AnemometerId$ = new BehaviorSubject<null | string>(null)
  chart3Date$ = new BehaviorSubject<Date[]>([])
}
