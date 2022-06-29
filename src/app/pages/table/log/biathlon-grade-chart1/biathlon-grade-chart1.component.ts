import { Component, OnInit, Inject, Injector, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import * as dayjs from 'dayjs';
import { BiathlonGradeEntity, FieldEntity, SportsManEntity } from 'src/app/entities';
import { concatMap, shareReplay } from 'rxjs/operators';
import { JsonQueryService } from 'src/app/service/json-query.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const direction = 6;
const speed = 0.2;
function getOption(max: number, data: [number, number, number][]) {
  return {
    tooltip: {},
    xAxis: {
      type: 'category',
      axisLabel: {
        formatter: (x: number) => `${x * direction}°`
      }
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        formatter: (x: number) => `${`${x * speed}`.slice(0, 3)}m/s`
      }
    },
    visualMap: {
      min: 0,
      max,
      calculable: true,
      realtime: false,
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    series: [{
      name: 'Gaussian',
      type: 'heatmap',
      data,
      emphasis: {
        itemStyle: {
          borderColor: '#333',
          borderWidth: 1
        }
      },
      progressive: 1000,
      animation: false
    }]
  };
}

@Component({
  selector: 'app-biathlon-grade-chart1',
  templateUrl: './biathlon-grade-chart1.component.html',
  styleUrls: ['./biathlon-grade-chart1.component.scss']
})
export class BiathlonGradeChart1Component implements AfterViewInit {

  @ViewChild('chart')
  chartElement!: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(JsonQueryService) private jsonQuery: JsonQueryService,
    @Inject(HttpClient) private http: HttpClient,
  ) { }

  @Input()
  searchEvent!: Subject<{
    startDate: string | undefined,
    endDate: string | undefined,
    targetSportsManId?: SportsManEntity['id'],
    fieldId?: FieldEntity['id'],
  }>;

  async ngAfterViewInit() {
    const charts = echarts.init(this.chartElement.nativeElement);
    this.searchEvent.pipe(
      concatMap(({
        startDate,
        endDate,
        fieldId,
        targetSportsManId,
      }) => this.http.post<{ 命中: [number, number, number][], 未命中: [number, number, number][] }>(`api/biathlon-grade-chart1`, {
        sportsManId: targetSportsManId,
        fieldId,
        startDate,
        endDate,
        direction,
        speed,
      })),
      shareReplay(1),
    ).subscribe(({ 命中, 未命中 }) => {
      const height = Math.max(0, ...命中.map((x) => x[1]), ...未命中.map((x) => x[1]));
      const arr = new Map();
      命中.forEach(([x, y, c]) => arr.set(x * height + y, [x, y, c, 0]));
      未命中.forEach(([x, y, c]) => {
        const index = x * height + y;
        const saved = arr.get(index);
        if (saved) {
          saved[3] = c;
        } else {
          arr.set(index, [x, y, 0, c]);
        }
      });
      charts.setOption(getOption(1, [...arr.values()].map(([x, y, a, b]) => [x, y, b === 0 ? 1 : a / (b + a)])));
    });
  }
}
