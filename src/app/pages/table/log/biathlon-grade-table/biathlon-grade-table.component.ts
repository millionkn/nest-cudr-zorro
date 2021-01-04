import { Component, OnInit, Inject, Injector, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { BiathlonGradeEntity, SportsManEntity, FieldEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { ItemEditorComponent } from 'src/app/modal-editor/editors/item-editor/item-editor.component';
import { DateEditorComponent } from 'src/app/modal-editor/editors/date-editor/date-editor.component';
import { DateString } from 'src/app/utils/entity';
import * as dayjs from 'dayjs';
import { BoolEditorComponent } from 'src/app/modal-editor/editors/bool-editor/bool-editor.component';
import { HttpClient } from '@angular/common/http';

@EditorTitle('射击成绩')
class View extends BiathlonGradeEntity {
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
    label: '准心调教刻度',
    component: () => StringEditorComponent,
    params: () => ({
    }),
  })
  准心调教刻度!: string;
  @EditorIs({
    label: '成绩',
    component: () => BoolEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  成绩!: boolean;
  @EditorIs({
    label: '射击姿势',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  射击姿势!: string;
  @EditorIs({
    label: '靶位',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  靶位!: string;
  @EditorIs({
    label: '记录人',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  记录人!: string;
}

@Component({
  selector: 'app-biathlon-grade-table',
  templateUrl: './biathlon-grade-table.component.html',
  styleUrls: ['./biathlon-grade-table.component.scss']
})
export class BiathlonGradeTableComponent implements OnInit, OnDestroy {

  @Input()
  searchEvent!: Subject<{
    startDate: string,
    endDate: string,
    targetSportsManId?: SportsManEntity['id'],
  }>;

  @Input()
  addEvent!: Subject<any>;
  @Output()
  addSuccess = new EventEmitter<void>();

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
    @Inject(HttpClient) private http: HttpClient,
  ) { }
  binder: any;
  async ngOnInit() {
    this.addEvent.subscribe(async () => {
      await this.binder.editHandler();
      this.addSuccess.emit();
    });
    this.binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
      map(({
        targetSportsManId,
        startDate,
        endDate,
      }) => {
        const where: QueryOption<View> = {
          运动员: {
            id: {
              '': targetSportsManId ? { in: [targetSportsManId] } : undefined,
            },
          },
          赛场: {},
          时间: {
            '': {
              moreOrEqual: startDate,
              lessOrEqual: endDate,
            }
          }
        };
        return where;
      })
    ));
  }
  reset() {
  }
  ngOnDestroy() {
  }
}
