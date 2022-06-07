import { Component, OnInit, Inject, Injector } from '@angular/core';
import { SportsManEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { NumberEditorComponent } from 'src/app/modal-editor/editors/number-editor/number-editor.component';
import { LoginService } from 'src/app/service/login.service';
import { SportsManClickService } from 'src/app/service/sportsManClick.serivce';
import { Router } from '@angular/router';

@EditorTitle('运动员信息')
class View extends SportsManEntity {
  @EditorIs({
    label: '姓名',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  姓名 = '';
  @EditorIs({
    label: '性别',
    component: () => StringEditorComponent,
    params: () => ({}),
  })
  性别 = '';
  @EditorIs({
    label: '身高',
    component: () => NumberEditorComponent,
    params: () => ({
      allowFloat: true,
    }),
  })
  身高 = 0;
}

@Component({
  selector: 'app-sports-man-table',
  templateUrl: './sports-man-table.component.html',
  styleUrls: ['./sports-man-table.component.scss']
})
export class SportsManTableComponent implements OnInit {

  searchEvent = new ReplaySubject<null>(1);

  SportsManEntity = SportsManEntity;
  SportsManEntityLabel = (e: SportsManEntity) => e.姓名
  sportManId = null as null | SportsManEntity['id'];

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(ModalBinderFactoryService) private factory: ModalBinderFactoryService,
    @Inject(SportsManClickService) private sportsManClickService: SportsManClickService,
    @Inject(Router) private router: Router,
  ) { }
  binder = this.factory.create(View, this.injector, this.searchEvent.pipe(
    map(() => {
      const where: QueryOption<View> = {
        id: this.sportManId ? { '': { in: [this.sportManId] } } : undefined,
      };
      return where;
    })
  ));
  async ngOnInit() {
    this.reset();
    this.searchEvent.next(null);
  }
  reset() {
    this.sportManId = null;
  }
  clickName(id: string) {
    this.sportsManClickService.sportsManId = id as any
    if (this.sportsManClickService.base === 'skijump') {
      this.router.navigate(['/table', 'skijump', 'log', '滑雪成绩'])
    } else {
      this.router.navigate(['/table', 'biathlon', 'log', '冬季两项'])
    }

  }
}
