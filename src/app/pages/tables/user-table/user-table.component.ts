import { Component, OnInit, Inject, Injector } from '@angular/core';
import { UserEntity, TGroupEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ItemEditorComponent } from 'src/app/modal-editor/editors/item-editor/item-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';

@EditorTitle('用户')
class View extends UserEntity {
  @EditorIs({
    label: '用户名',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  username!: string;
  @EditorIs({
    label: '姓名',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  name!: string;
  @EditorIs({
    label: '分组',
    component: () => ItemEditorComponent,
    params: () => ({
      klass: () => TGroupEntity,
      nameFun: (g: TGroupEntity) => g.name,
      isMultiple: true,
    })
  })
  groups!: TGroupEntity[];
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  name = '';
  selectEvent = new ReplaySubject<null>(1);

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
  ) { }
  binder = this.factory.create(View, this.injector, this.selectEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        name: {
          '': {
            like: this.name,
          }
        },
        groups: {},
      };
      return where;
    })
  ));
  async ngOnInit() {
    this.reset();
    this.selectEvent.next(null);
  }
  reset() {
    this.name = '';
  }
}
