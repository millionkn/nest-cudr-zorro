import { Component, OnInit, Inject, Injector } from '@angular/core';
import { SportsManEntity, FieldEntity, FreeSkijumpGradeEntity } from 'src/app/entities';
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
export class View extends FreeSkijumpGradeEntity {
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
  出发时间!: DateString;
  @EditorIs({
    label: '起滑点位置',
    component: () => NumberEditorComponent,
    params: () => ({
      min: -999,
      allowFloat: true,
    }),
  })
  起滑点位置!: number;
  @EditorIs({
    label: '赛道风指数',
    component: () => NumberEditorComponent,
    params: () => ({
      min: -999,
      allowFloat: true,
    }),
  })
  赛道风指数!: number;
  @EditorIs({
    label: '_1号风指数',
    component: () => NumberEditorComponent,
    params: () => ({
      min: -999,
      allowFloat: true,
    }),
  })
  _1号风指数!: number;
  @EditorIs({
    label: '温度',
    component: () => NumberEditorComponent,
    params: () => ({
      min: -999,
      allowFloat: true,
    }),
  })
  温度!: number;
  @EditorIs({
    label: '滑行速度',
    component: () => NumberEditorComponent,
    params: () => ({
      min: -999,
      allowFloat: true,
    }),
  })
  滑行速度!: number;
  @EditorIs({
    label: '情况说明',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  情况说明!: string;
}

@Component({
  selector: 'app-skijump-free-grade-table',
  templateUrl: './skijump-free-grade-table.component.html',
  styleUrls: ['./skijump-free-grade-table.component.scss']
})
export class SkijumpFreeGradeTableComponent implements OnInit {
  searchEvent = new ReplaySubject<null>(1);
  FieldEntity = FieldEntity;
  fieldEntityLabel = (e: FieldEntity) => e.名称
  fieldId = null as null | FieldEntity['id'];
  timeRange: Date[] = [];
  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
  ) { }
  sportManId = this.route.snapshot.queryParams['sportsManId'] || ''
  SportsManEntity = SportsManEntity
  SportsManEntityLabel = (e: SportsManEntity) => e.姓名
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        运动员: {
          id: { '': { in: !this.sportManId ? undefined : [this.sportManId] } },
        },
        赛场: {
          id: { '': { in: !this.fieldId ? undefined : [this.fieldId] } }
        },
        出发时间: {
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
    this.sportManId = '';
    this.timeRange = [];
  }
}
