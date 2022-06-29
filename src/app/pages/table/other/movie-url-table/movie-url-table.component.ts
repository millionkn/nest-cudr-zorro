import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MovieUrlEntity, FieldEntity, BlobData } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { ItemEditorComponent } from 'src/app/modal-editor/editors/item-editor/item-editor.component';
import * as dayjs from 'dayjs';
import { DateEditorComponent } from 'src/app/modal-editor/editors/date-editor/date-editor.component';
import { DateString } from 'src/app/utils/entity';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EnumEditorComponent } from 'src/app/modal-editor/editors/enum-editor/enum-editor.component';
import { FileEditorComponent } from 'src/app/modal-editor/editors/file-editor/file-editor.component';

@EditorTitle('影像记录')
class View extends MovieUrlEntity {
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
      withTime: true,
    }),
  })
  时间!: DateString;
  @EditorIs({
    label: '数据类型',
    component: () => EnumEditorComponent,
    params: () => ({
      arr: [
        { id: '照片', label: '照片' },
        { id: '视频', label: '视频' },
      ]
    }),
  })
  数据类型!: '照片' | '视频';
  @EditorIs({
    label: '关键字',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  关键字!: string;
  @EditorIs({
    label: '文件',
    component: () => FileEditorComponent,
    params: () => ({}),
  })
  影像url!: string;
}

@Component({
  selector: 'app-movie-url-table',
  templateUrl: './movie-url-table.component.html',
  styleUrls: ['./movie-url-table.component.scss']
})
export class MovieUrlTableComponent implements OnInit {

  searchEvent = new ReplaySubject<null>(1);

  FieldEntity = FieldEntity;
  FieldEntityLabel = (e: FieldEntity) => e.名称
  filed = null as null | FieldEntity['id'];

  keyword = '';
  timeRange: Date[] = [
  ];

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
  ) { }
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        赛场: {
          id: this.filed ? { '': { in: [this.filed] } } : undefined
        },
        关键字: {
          '': {
            like: this.keyword.split(' '),
          }
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
    this.filed = null;
    this.keyword = '';
  }
  showPhotoUrl = null as null | SafeResourceUrl;
  showMovieUrl = null as null | SafeResourceUrl;
  show(url: string, type: string) {
    if (type === '照片') {
      this.showPhotoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if (type === '视频') {
      this.showMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
