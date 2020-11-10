import { Inject, Injectable, Injector, Type } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { EditorTitle } from './decorators';
import { loadDecoratorData, isDecorated } from '../utils/decorator';

@Injectable()
export class ModalEditorService {
  constructor(
    @Inject(NzModalService) private modalService: NzModalService,
  ) { }
  async showEditor<T>(
    injector: Injector,
    entity: T,
    templateKlass: Type<any>,
    onOK: (entity: T) => Promise<boolean>,
  ) {
    await new Promise((res, rej) => {
      const nzTitle = isDecorated(EditorTitle, templateKlass) ? `${`id` in entity ? `编辑` : `新增`}${loadDecoratorData(EditorTitle, templateKlass)}` : undefined;
      this.modalService.create({
        nzTitle,
        nzContent: TableEditorComponent,
        nzComponentParams: {
          targetInjector: injector,
          templateKlass,
          entity: JSON.parse(JSON.stringify(entity)),
        },
        nzOnOk: async (instance: TableEditorComponent<T>) => {
          const result = await onOK(instance.entity);
          if (result) { res(); }
          return result;
        },
        nzOnCancel: () => {
          rej();
          return true;
        }
      });
    });
  }
}
