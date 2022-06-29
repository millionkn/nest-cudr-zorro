import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-enum-editor',
  templateUrl: './enum-editor.component.html',
  styleUrls: ['./enum-editor.component.scss']
})
export class EnumEditorComponent implements OnInit {

  constructor(
  ) { }
  value!: string;
  newValue = new Subject<void>();
  enumArr: { id: string, label: string }[] = []
  async setParams(params: {
    arr: { id: string, label: string }[],
  }) {
    this.enumArr = params.arr
  }
  async ngOnInit() {

  }
  selectChangeHandler(enumId: string) {
    this.value = enumId
    this.newValue.next()
  }
}
