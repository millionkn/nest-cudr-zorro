import { Component, OnInit, Inject, Injector } from '@angular/core';
import { SportsManStateEntity, SportsManEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { ItemEditorComponent } from 'src/app/modal-editor/editors/item-editor/item-editor.component';
import { DateEditorComponent } from 'src/app/modal-editor/editors/date-editor/date-editor.component';
import { NumberEditorComponent } from 'src/app/modal-editor/editors/number-editor/number-editor.component';
import { DateString } from 'src/app/utils/entity';
import * as dayjs from 'dayjs';

@EditorTitle('体征信息记录')
class View extends SportsManStateEntity {
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
    label: '时间',
    component: () => DateEditorComponent,
    params: () => ({
    }),
  })
  时间!: DateString;
  @EditorIs({
    label: '脉搏',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  脉搏!: number;
  @EditorIs({
    label: '心率',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  心率!: number;
  @EditorIs({
    label: '血压',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  血压!: number;
  @EditorIs({
    label: '体温',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  体温!: number;
}

@Component({
  selector: 'app-sports-man-state-table',
  templateUrl: './sports-man-state-table.component.html',
  styleUrls: ['./sports-man-state-table.component.scss']
})
export class SportsManStateTableComponent implements OnInit {

  timeRange = [
    dayjs().add(-7, 'date').toDate(),
    dayjs().toDate(),
  ];
  
  SportsManEntity = SportsManEntity;
  SportsManEntityLabel = (e: SportsManEntity) => e.姓名
  sportManId = null as null | SportsManEntity['id'];

  searchEvent = new ReplaySubject<null>(1);

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
  ) { }
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        运动员: {
          id: this.sportManId ? { '': { in: [this.sportManId] } } : undefined,
        },
        时间: {
          '': {
            moreOrEqual: !this.timeRange[0] ? undefined : dayjs(this.timeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
            lessOrEqual: !this.timeRange[1] ? undefined : dayjs(this.timeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
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
    this.timeRange = [
      dayjs().add(-7, 'date').toDate(),
      dayjs().toDate(),
    ];
    this.sportManId = null;
  }
}
