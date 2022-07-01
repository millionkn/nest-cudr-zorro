import { Component, OnInit } from '@angular/core';
import { Editor } from '../../utils';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bool-editor',
  templateUrl: './bool-editor.component.html',
  styleUrls: ['./bool-editor.component.scss']
})
export class BoolEditorComponent implements Editor<boolean, {}>, OnInit {
  value!: boolean;
  setParams(params: {}) {
    this.value = this.value || false
  }
  newValue = new Subject<void>();
  ngOnInit() {
  }
  valueChangeHandler(value: boolean) {
    this.value = value;
    this.newValue.next();
  }
}
