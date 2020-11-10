import { Component, OnInit, ComponentFactoryResolver, ViewChildren, ViewContainerRef, QueryList, Injector, OnDestroy, Type } from '@angular/core';
import { loadDecoratedKeys, loadDecoratorData } from 'src/app/utils/decorator';
import { EditorIs } from 'src/app/modal-editor/decorators';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent<T> implements OnInit, OnDestroy {

  constructor() { }

  @ViewChildren('vc', { read: ViewContainerRef })
  private viewContainerRef!: QueryList<ViewContainerRef>;

  entity!: T;
  templateKlass!: Type<any>;

  targetInjector!: Injector;

  labels = new Array<string>();
  destory = new Array<() => void>();

  async ngOnInit() {
    const decortedKeys = loadDecoratedKeys(EditorIs, this.templateKlass);
    this.labels = decortedKeys.map((key) => loadDecoratorData(EditorIs, this.templateKlass, key).label);
    await new Promise(res => setTimeout(res, 0));
    const containerRefs = this.viewContainerRef.toArray();
    const setParamsFun = new Array<() => void>();
    decortedKeys.map((key, index) => {
      const info = loadDecoratorData(EditorIs, this.templateKlass, key);
      const viewRef = containerRefs[index];
      const componentRef = viewRef.createComponent(
        this.targetInjector.get(ComponentFactoryResolver).resolveComponentFactory(info.component())
      );
      componentRef.instance.value = this.entity[key as keyof T];
      setParamsFun.push(() => {
        componentRef.instance.setParams(info.params(this.entity));
      });
      const subscription = componentRef.instance.newValue.subscribe(() => {
        this.entity[key as keyof T] = componentRef.instance.value;
        setParamsFun.forEach((set) => set());
      });
      this.destory.push(() => subscription.unsubscribe());
    });
    setParamsFun.forEach((set) => set());
  }
  ngOnDestroy() {
    this.destory.forEach((destory) => destory());
  }
}
