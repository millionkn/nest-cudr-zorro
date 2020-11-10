import { Component, OnInit } from '@angular/core';
import { Editor } from '../../utils';
import { Subject } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.scss']
})
export class DateEditorComponent implements Editor<string, {}>, OnInit {

  constructor() { }
  value = dayjs().format('YYYY-MM-DD HH:mm:ss');
  newValue = new Subject<void>();

  nzFormat!: string;
  nzShowTime = false;
  date!: Date;
  setParams(params: {
    withTime?: boolean
  }) {
    if (params.withTime) {
      this.nzShowTime = true;
      this.nzFormat = 'yyyy-MM-dd HH:mm:ss';
      this.date = dayjs(this.value, 'YYYY-MM-DD HH:mm:ss').toDate();
    } else {
      this.nzShowTime = false;
      this.nzFormat = 'yyyy-MM-dd';
      this.date = dayjs(this.value, 'YYYY-MM-DD HH:mm:ss').toDate();
    }
  }
  valueChangeHandler(date: Date | null) {
    if (date === null) {
      this.date = dayjs().toDate();
      this.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
    } else {
      this.value = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }
    this.newValue.next();
  }
  ngOnInit() {
  }
}
