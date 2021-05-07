import { Component, EventEmitter, Inject, Input, OnInit, Output, Type } from '@angular/core';
import { JsonQueryService } from '../service/json-query.service';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent implements OnInit {

  constructor(
    @Inject(JsonQueryService) private jsonQuery: JsonQueryService,
  ) { }

  @Output() ngModelChange = new EventEmitter();
  @Input() value = null;

  @Input() klass!: Type<any>;
  @Input() label!: (x: any) => string;

  itemArray$!: Promise<{ id: any }[]>
  ngOnInit(): void {
    this.itemArray$ = this.jsonQuery.query(this.klass, { where: {} }).then(({ data }) => data);
  }

}
