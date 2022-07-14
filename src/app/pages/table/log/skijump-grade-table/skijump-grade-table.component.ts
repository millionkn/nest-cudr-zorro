import { Component, OnInit, Inject, Injector } from '@angular/core';
import { SkijumpGradeEntity, SportsManEntity, FieldEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { ItemEditorComponent } from 'src/app/modal-editor/editors/item-editor/item-editor.component';
import { DateEditorComponent } from 'src/app/modal-editor/editors/date-editor/date-editor.component';
import { NumberEditorComponent } from 'src/app/modal-editor/editors/number-editor/number-editor.component';
import * as dayjs from 'dayjs';
import { DateString } from 'src/app/utils/entity';
import { ActivatedRoute } from '@angular/router';

@EditorTitle('滑雪成绩')
class View extends SkijumpGradeEntity {
  @EditorIs({
    label: '运动员',
    component: () => ItemEditorComponent,
    params: () => ({
      klass: () => SportsManEntity,
      nameFun: (s: SportsManEntity) => s.姓名,
    }),
  })
  运动员!: SportsManEntity;
  @EditorIs({
    label: '赛场',
    component: () => ItemEditorComponent,
    params: () => ({
      klass: () => FieldEntity,
      nameFun: (s: FieldEntity) => s.名称,
    }),
  })
  赛场!: FieldEntity;
  @EditorIs({
    label: '时间',
    component: () => DateEditorComponent,
    params: () => ({
    }),
  })
  时间!: DateString;
  @EditorIs({
    label: '天气',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  天气!: string;
  @EditorIs({
    label: '气温',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  气温!: number;
  @EditorIs({
    label: '气压',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  气压!: number;
  @EditorIs({
    label: '体重',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  体重!: number;
  @EditorIs({
    label: '滑行速度',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  滑行速度!: number;
  @EditorIs({
    label: '滑行姿势',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  滑行姿势!: string;
  @EditorIs({
    label: '出台速度',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  出台速度!: number;
  @EditorIs({
    label: '空中姿势',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  空中姿势!: string;
  @EditorIs({
    label: '落地距离',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  落地距离!: number;
  @EditorIs({
    label: '成绩',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  成绩!: number;
  @EditorIs({
    label: '记录人',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  记录人!: string;
}

@Component({
  selector: 'app-skijump-grade-table',
  templateUrl: './skijump-grade-table.component.html',
  styleUrls: ['./skijump-grade-table.component.scss']
})
export class SkijumpGradeTableComponent implements OnInit {
  searchEvent = new ReplaySubject<null>(1);
  FieldEntity = FieldEntity;
  fieldEntityLabel = (e: FieldEntity) => e.名称
  fieldId = null as null | FieldEntity['id'];
  sportManId = this.route.snapshot.queryParams['sportsManId'] || ''
  SportsManEntity = SportsManEntity
  SportsManEntityLabel = (e: SportsManEntity) => e.姓名
  timeRange: Date[] = [];
  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
  ) { }
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        运动员: {
          id: { '': { in: !this.sportManId ? undefined : [this.sportManId] } },
        },
        赛场: {
          id: { '': { in: !this.fieldId ? undefined : [this.fieldId] } }
        },
        时间: {
          '': {
            moreOrEqual: !this.timeRange[0] ? undefined : dayjs(this.timeRange[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            lessOrEqual: !this.timeRange[1] ? undefined : dayjs(this.timeRange[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
          }
        }
      };
      return where;
    })
  ));
  async ngOnInit() {
    this.reset();
    this.searchEvent.next(null);
  }
  reset() {
    this.sportManId = ''
    this.timeRange = [];
  }
}
