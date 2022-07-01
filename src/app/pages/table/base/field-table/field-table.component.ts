import { Component, OnInit, Inject, Injector, OnDestroy } from '@angular/core';
import { FieldEntity, MovieUrlEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { NumberEditorComponent } from 'src/app/modal-editor/editors/number-editor/number-editor.component';
import { FilesEditorComponent } from 'src/app/modal-editor/editors/files-editor/files-editor.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';

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
    label: '观测时长(小时)',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  观测时长 = 0;
  @EditorIs({
    label: '记录时间段',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  记录时间段 = '';
  @EditorIs({
    label: '备注',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  备注 = '';
  @EditorIs({
    label: '照片',
    component: () => FilesEditorComponent,
    params: () => ({
      accept: 'image/*'
    }),
  })
  photoIdArr = new Array<string>()

  @EditorIs({
    label: '视频',
    component: () => FilesEditorComponent,
    params: () => ({
      accept: 'video/*',
    }),
  })
  movieIdArr = new Array<string>()
}

@Component({
  selector: 'app-field-table',
  templateUrl: './field-table.component.html',
  styleUrls: ['./field-table.component.scss']
})
export class FieldTableComponent implements OnInit, OnDestroy {

  searchEvent = new ReplaySubject<null>(1);

  FieldEntity = FieldEntity;
  FieldEntityLabel = (e: FieldEntity) => e.名称
  filed = null as null | FieldEntity['id'];

  city = '';
  country = '';

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    @Inject(NzMessageService) private message: NzMessageService,
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
        id: this.filed ? { '': { in: [this.filed] } } : undefined,
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
    this.city = '';
    this.country = '';
  }
  showMovieUrl = null as null | SafeResourceUrl;
  showPhotoUrl = null as null | SafeResourceUrl;
  closeShow = () => { }
  ngOnDestroy(): void {
    this.closeShow()
  }
  showPhoto(view: View) {
    let index = 0
    const photoIdArr = view.photoIdArr || []
    const id = photoIdArr[index]
    if (!id) {
      this.message.warning(`该场地没有添加照片`)
      return
    }
    this.showPhotoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`cudr/blob/${id}`)
    const handle = (ev: WheelEvent) => {
      if (ev.deltaY > 0) {
        index += 1
        if (index >= photoIdArr.length) {
          index = photoIdArr.length - 1
        }
      } else if (ev.deltaY < 0) {
        index -= 1
        if (index <= 0) {
          index = 0
        }
      }
      const id = photoIdArr[index]
      this.showPhotoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`cudr/blob/${id}`)
    }
    window.addEventListener('wheel', handle)
    this.closeShow = () => {
      window.removeEventListener(`wheel`, handle)
      this.showPhotoUrl = null
    }
  }

  showMovie(view: View) {
    let index = 0
    const movieIdArr = view.movieIdArr || []
    const id = movieIdArr[index]
    if (!id) {
      this.message.warning(`该场地没有添加影像`)
      return
    }
    this.showMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`cudr/blob/${id}`)
    const handle = (ev: WheelEvent) => {
      if (ev.deltaY > 0) {
        index += 1
        if (index >= movieIdArr.length) {
          index = movieIdArr.length - 1
        }
      } else if (ev.deltaY < 0) {
        index -= 1
        if (index <= 0) {
          index = 0
        }
      }
      const id = movieIdArr[index]
      this.showMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`cudr/blob/${id}`)
    }
    window.addEventListener('wheel', handle)
    this.closeShow = () => {
      window.removeEventListener(`wheel`, handle)
      this.showMovieUrl = null
    }
  }
}
