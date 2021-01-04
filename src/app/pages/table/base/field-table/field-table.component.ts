import { Component, OnInit, Inject, Injector } from '@angular/core';
import { FieldEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';

@EditorTitle('场地信息')
class View extends FieldEntity {
  @EditorIs({
    label: '名称',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  名称 = '';
  @EditorIs({
    label: '国家',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  国家 = '';
  @EditorIs({
    label: '城市',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  城市 = '';
  @EditorIs({
    label: '备注',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  备注 = '';
}

@Component({
  selector: 'app-field-table',
  templateUrl: './field-table.component.html',
  styleUrls: ['./field-table.component.scss']
})
export class FieldTableComponent implements OnInit {

  searchEvent = new ReplaySubject<null>(1);

  name = '';
  city = '';
  country = '';

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
  ) { }
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        国家: {
          '': { like: this.country },
        },
        城市: {
          '': { like: this.city }
        },
        名称: {
          '': { like: this.name },
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
    this.name = '';
    this.city = '';
    this.country = '';
  }
}
