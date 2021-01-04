import { Component, OnInit, Input, Inject, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.scss']
})
export class ExcelImportComponent implements OnInit {

  constructor(
    @Inject(NzMessageService) private message: NzMessageService,
    @Inject(HttpClient) private http: HttpClient,
  ) { }
  @ViewChild('selector')
  selector!: ElementRef<HTMLInputElement>;
  @Input()
  interface = '';
  @Output()
  importSuccess = new EventEmitter<void>();
  @Input()
  requestBody: { [key: string]: string } = {};

  isUploading = false;

  ngOnInit(): void {
  }
  async clickHandler() {
    this.selector.nativeElement.click();
  }
  async fileChangeHandler(event: any) {
    const files = this.selector.nativeElement.files;
    if (files === null) { return; }
    const file = files.item(0);
    if (!file) { return; }
    await this.upload(file);
    this.selector.nativeElement.files = null;
    this.selector.nativeElement.value = '';
  }
  async upload(blob: Blob) {
    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', blob);
    for (const key in this.requestBody) {
      if (this.requestBody.hasOwnProperty(key)) {
        const element = this.requestBody[key];
        formData.append(key, element);
      }
    }
    try {
      await this.http.post<{}>(this.interface, formData).toPromise();
      this.message.success('导入成功');
      this.importSuccess.emit();
    } catch (e) {
      if (e.error && e.error.message) {
        this.message.error(e.error.message);
      } else {
        this.message.error('导入失败');
      }
    }
    this.isUploading = false;
  }

}
