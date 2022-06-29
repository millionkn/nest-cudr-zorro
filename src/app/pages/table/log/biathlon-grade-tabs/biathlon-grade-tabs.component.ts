import { Component, OnInit, Inject } from '@angular/core';
import { JsonQueryService } from 'src/app/service/json-query.service';
import { HttpClient } from '@angular/common/http';
import { FieldEntity, SportsManEntity } from 'src/app/entities';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SportsManClickService } from 'src/app/service/sportsManClick.serivce';

@Component({
  selector: 'app-biathlon-grade-tabs',
  templateUrl: './biathlon-grade-tabs.component.html',
  styleUrls: ['./biathlon-grade-tabs.component.scss']
})
export class BiathlonGradeTabsComponent implements OnInit {

  constructor(
    @Inject(JsonQueryService) private jsonQuery: JsonQueryService,
    @Inject(HttpClient) private http: HttpClient,
    @Inject(SportsManClickService) private sportsManClickService: SportsManClickService,
  ) {
    this.targetSportsManId = this.sportsManClickService.sportsManId || undefined
    this.sportsManClickService.sportsManId = null
  }
  FieldEntity = FieldEntity;
  fieldEntityLabel = (e: FieldEntity) => e.名称
  fieldId = null as null | FieldEntity['id'];

  targetSportsManId: undefined | SportsManEntity['id']
  timeRange: Date[] = [
  ];
  searchEvent = new BehaviorSubject(null);
  out$ = this.searchEvent.pipe(map(() => {
    console.log(111,)
    return {
      startDate: !this.timeRange[0] ? undefined : dayjs(this.timeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endDate: !this.timeRange[1] ? undefined : dayjs(this.timeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      targetSportsManId: this.targetSportsManId,
      fieldId: this.fieldId
    };
  }));
  sportsManArray$ = this.jsonQuery.query(SportsManEntity, {
    where: {
    },
  }).then(({ data }) => data);
  add$ = new Subject();
  ngOnInit(): void {
  }
  reset() {
    this.targetSportsManId = undefined;
    this.timeRange = [
    ];
    this.searchEvent.next(null);
  }
  isExporting = false;
  async exportHandler() {
    this.isExporting = true;
    const startStr = dayjs(this.timeRange[0] || 0).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const endStr = dayjs(this.timeRange[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    const blob = await this.http.post(`api/export/BiathlonGrade`, {
      start: startStr,
      end: endStr,
      id: this.targetSportsManId,
    }, { responseType: 'blob' }).toPromise();
    const url = URL.createObjectURL(blob);
    const alink = document.createElement('a');
    alink.href = url;
    alink.download = '导出数据.xlsx';
    alink.dispatchEvent(new MouseEvent('click'));
    this.isExporting = false;
    URL.revokeObjectURL(url);
  }
}
