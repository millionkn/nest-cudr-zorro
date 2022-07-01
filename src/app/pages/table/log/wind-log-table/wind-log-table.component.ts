import { Component, OnInit, Inject, Injector } from '@angular/core';
import { WindLogEntity, FieldEntity, AnemometerEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { QueryOption, JsonQueryService } from 'src/app/service/json-query.service';
import { ItemEditorComponent } from 'src/app/modal-editor/editors/item-editor/item-editor.component';
import { DateEditorComponent } from 'src/app/modal-editor/editors/date-editor/date-editor.component';
import { DateString } from 'src/app/utils/entity';
import * as dayjs from 'dayjs';
import { WindLogModalBinderFactoryService } from 'src/app/modal-editor/wind-log-modal-binder-factory.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/service/login.service';

@EditorTitle('风环境记录')
class View extends WindLogEntity {
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
    label: '测风仪',
    component: () => ItemEditorComponent,
    params: () => ({
      klass: () => AnemometerEntity,
      nameFun: (s: AnemometerEntity) => s.编号,
    }),
  })
  测风仪!: AnemometerEntity;
  @EditorIs({
    label: '记录组号',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  记录组号!: string;
  @EditorIs({
    label: '时间',
    component: () => DateEditorComponent,
    params: () => ({}),
  })
  时间!: DateString;
  @EditorIs({
    label: '风向',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  风向!: string;
  @EditorIs({
    label: '风速',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  风速!: string;
  @EditorIs({
    label: '温度',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  温度!: string;
  @EditorIs({
    label: '气压',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  气压!: string;
}

@Component({
  selector: 'app-wind-log-table',
  templateUrl: './wind-log-table.component.html',
  styleUrls: ['./wind-log-table.component.scss']
})
export class WindLogTableComponent implements OnInit {

  searchEvent = new ReplaySubject<null>(1);


  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(WindLogModalBinderFactoryService) private factory: WindLogModalBinderFactoryService,
    @Inject(JsonQueryService) private jsonQuery: JsonQueryService,
    @Inject(HttpClient) private http: HttpClient,
    @Inject(LoginService) private loginServ: LoginService,
  ) { }
  targetFieldId!: FieldEntity['id'];
  timeRange: Date[] = [
  ];

  showMode1 = this.loginServ.windLog1()
  showMode2 = this.loginServ.windLog2()

  fieldArray$ = this.jsonQuery.query(FieldEntity, { where: {} }).then(({ data }) => data);
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    concatMap(async () => {
      return {
        targetFieldId: this.targetFieldId,
        startDate: !this.timeRange[0] ? undefined : this.timeRange[0],
        endDate: !this.timeRange[1] ? undefined : this.timeRange[1],
      };
    })
  ));
  async ngOnInit() {
    this.reset();
    const [field] = await this.fieldArray$;
    this.targetFieldId = field.id;
    this.searchEvent.next(null);
  }
  reset() {
  }

  isShowExport = false;
  exportDate = dayjs().toDate();
  isExporting = false;
  async exportHandler() {
    this.isExporting = true;
    const blob = await this.http.post(`api/export/windLog`, {
      fieldId: this.targetFieldId,
      date: dayjs(this.exportDate).format('YYYY-MM-DD'),
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
