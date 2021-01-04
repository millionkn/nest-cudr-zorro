import { Component, OnInit, Inject, Injector } from '@angular/core';
import { WindTypeEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { NumberEditorComponent } from 'src/app/modal-editor/editors/number-editor/number-editor.component';

@EditorTitle('风向标形态')
class View extends WindTypeEntity {
  @EditorIs({
    label: '风向',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  风向!: string;
  @EditorIs({
    label: '风速',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  风速!: number;
  @EditorIs({
    label: '风向标形态',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  风向标形态!: string;
}

@Component({
  selector: 'app-wind-type-table',
  templateUrl: './wind-type-table.component.html',
  styleUrls: ['./wind-type-table.component.scss']
})
export class WindTypeTableComponent implements OnInit {

  searchEvent = new ReplaySubject<null>(1);

  speedMax = 100;
  speedMin = 0;
  fengxiang = '';

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
  ) { }
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        风向: {
          '': { like: this.fengxiang }
        },
        风速: {
          '': {
            moreOrEqual: this.speedMin || undefined,
            lessOrEqual: this.speedMax || undefined,
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
    this.speedMax = 100;
    this.speedMin = 0;
    this.fengxiang = '';
  }
}
