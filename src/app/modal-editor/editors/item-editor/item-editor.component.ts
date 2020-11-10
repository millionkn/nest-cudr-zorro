import { Component, Inject, OnInit, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { JsonQueryService, QueryOption } from 'src/app/service/json-query.service';
import { BaseEntity } from 'src/app/utils/entity';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {

  constructor(
    @Inject(JsonQueryService) private jsonQuery: JsonQueryService,
  ) { }
  value!: any;
  newValue = new Subject<void>();

  items!: BaseEntity[];
  result!: any[];
  text!: (obj: any) => string;

  selectingIndex!: number | number[];
  mode: 'default' | 'multiple' = 'default';

  async setParams<E extends BaseEntity>(params: {

    klass: () => Type<E>,
    where?: QueryOption<any>,
    filter?: (obj: any) => boolean,
    nameFun: (entity: any) => string,
    isMultiple?: boolean,
  }) {
    this.text = params.nameFun;
    if (!this.result) {
      // @ts-ignore
      const { data } = await this.jsonQuery.query(params.klass(), { where: params.where || {} });
      this.result = data as unknown as E[];
    }
    const filter = params.filter;
    if (filter) {
      this.items = this.result.filter((r) => filter(r));
    } else {
      this.items = this.result;
    }
    if (params.isMultiple) {
      this.mode = 'multiple';
      if (this.value instanceof Array) {
        this.selectingIndex = this.value.map((v) => this.items.findIndex((x) => x.id === v.id));
        if (this.selectingIndex.includes(-1)) {
          this.selectChangeHandler(this.selectingIndex.filter((i) => i !== -1));
        }
      } else {
        this.selectingIndex = [];
      }
    } else {
      this.mode = 'default';
      this.selectingIndex = this.value ? this.items.findIndex((x) => x.id === this.value.id) : -1;
    }
  }
  async ngOnInit() {

  }
  selectChangeHandler(num: number | number[]) {
    if (num instanceof Array) {
      this.value = num.map(n => this.items[n]);
      this.newValue.next();
    } else {
      this.value = this.items[num];
      this.newValue.next();
    }
    return true;
  }
}
