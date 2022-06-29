import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload/interface';
import { BlobData } from 'src/app/entities';


@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent implements OnInit {

  fileName = 'file'
  constructor() { }
  value!: any;
  newValue = new Subject<void>();
  accept = null as null | string;
  fileList: NzUploadFile[] = [];
  setParams(params: {
    accept?: string,
  }) {
    this.accept = params.accept || null;
  }
  valueChangeHandler(info: UploadChangeParam) {
    if (info.type === 'start') {
      this.fileList = [info.file]
    }
    if (info.file.response) {
      this.value = `cudr/blob/${info.file.response[this.fileName]}`;
    } else {
      this.value = null;
    }
    this.newValue.next();
  }
  ngOnInit() {
    if (this.value) {
      this.fileList = [{
        uid: this.value,
        name: this.value,
        url: this.value,
      }];
    } else {
      this.fileList = [];
    }
  }
}
