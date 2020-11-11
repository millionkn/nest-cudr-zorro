import { Component, OnInit } from '@angular/core';
import { Editor } from '../../utils';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-number-editor',
  templateUrl: './number-editor.component.html',
  styleUrls: ['./number-editor.component.scss']
})
export class NumberEditorComponent implements Editor<number, {}>, OnInit {

  constructor() { }
  value!: number;
  newValue = new Subject<void>();

  min?: number;
  max?: number;
  step?: number;

  setParams(params: {
    min?: number,
    max?: number,
    allowFloat: boolean,
  }) {
    this.min = params.min || 0;
    this.max = params.max || Number.MAX_SAFE_INTEGER;
    if (!params.allowFloat) {
      this.step = 1;
    } else {
      this.step = 0.1;
    }
  }
  valueChangeHandler(value: number) {
    this.value = value;
    this.newValue.next();
  }
  ngOnInit() {
  }
}
