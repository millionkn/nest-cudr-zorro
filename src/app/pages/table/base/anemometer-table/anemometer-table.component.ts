import { Component, OnInit, Inject, Injector } from '@angular/core';
import { AnemometerEntity, FieldEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { ItemEditorComponent } from 'src/app/modal-editor/editors/item-editor/item-editor.component';
import { NumberEditorComponent } from 'src/app/modal-editor/editors/number-editor/number-editor.component';

@EditorTitle('测风仪')
class View extends AnemometerEntity {
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
    label: '编号',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  编号!: string;
  @EditorIs({
    label: '侧边缘距离',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  侧边缘距离!: number
  @EditorIs({
    label: '起点距离',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  起点距离!: number;
  @EditorIs({
    label: '离地高度',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  离地高度!: number;
}

@Component({
  selector: 'app-anemometer-table',
  templateUrl: './anemometer-table.component.html',
  styleUrls: ['./anemometer-table.component.scss']
})
export class AnemometerTableComponent implements OnInit {

  searchEvent = new ReplaySubject<null>(1);
  filed = '';
  identifity = '';
  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
  ) { }
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        赛场: {
          名称: {
            '': {
              like: this.filed,
            }
          }
        },
        编号: {
          '': {
            like: this.identifity,
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
    this.filed = '';
    this.identifity = '';
  }
}
