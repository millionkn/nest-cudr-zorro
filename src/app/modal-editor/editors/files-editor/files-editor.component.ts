import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload/interface';


@Component({
  selector: 'app-files-editor',
  templateUrl: './files-editor.component.html',
  styleUrls: ['./files-editor.component.scss']
})
export class FilesEditorComponent implements OnInit {

  fileName = 'file'
  constructor() { }
  value = undefined as undefined | null | string[];
  newValue = new Subject<void>();
  accept = null as null | string;
  fileList: NzUploadFile[] = [];
  setParams(params: {
    accept?: string,
  }) {
    this.accept = params.accept || null;
  }
  valueChangeHandler(info: UploadChangeParam) {
    this.fileList = info.fileList
    if (info.type === 'success' || info.type === 'removed') {
      this.value = info.fileList.map((e) => e.response?.[this.fileName] || e.uid)
    }
    this.newValue.next();
  }
  ngOnInit() {
    if (this.value) {
      this.fileList = this.value.map((id) => ({ uid: id, name: id }));
    } else {
      this.fileList = [];
    }
  }
}
