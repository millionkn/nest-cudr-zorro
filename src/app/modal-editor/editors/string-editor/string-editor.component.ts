import { Component, OnInit } from '@angular/core';
import { Editor } from '../../utils';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-string-editor',
  templateUrl: './string-editor.component.html',
  styleUrls: ['./string-editor.component.scss']
})
export class StringEditorComponent implements Editor<string, {}>, OnInit {

  constructor() { }
  value!: string;
  newValue = new Subject<void>();
  setParams(params: {}) {
  }
  valueChangeHandler(value: string) {
    this.value = value;
    this.newValue.next();
  }
  ngOnInit() {
  }
}
