import { Component, OnInit, Inject, Injector } from '@angular/core';
import { WindTypeEntity } from 'src/app/entities';
import { ModalBinderFactoryService } from 'src/app/modal-editor/modal-binder-factory.service';
import { EditorIs, EditorTitle } from 'src/app/modal-editor/decorators';
import { StringEditorComponent } from 'src/app/modal-editor/editors/string-editor/string-editor.component';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOption } from 'src/app/service/json-query.service';
import { NumberEditorComponent } from 'src/app/modal-editor/editors/number-editor/number-editor.component';

const tableData = [...new Array(20)].map((o, a) => {
  return {
    speed: (a * 0.5 + 0.5).toFixed(1),
    colArr: [...new Array(12)].map((o, b): null | {
      angle1: string,
      angle2: string,
      url: string,
    } => {
      return null;
    })
  }
});

(`2.0	17.2	58.8
2.5	33.7	87.9
3.0	28.7	60.1
3.5	43.7	73.9
4.0	42.2	80.3
4.5	62.9	84.7
5.0	52.6	85.4
5.5	63.8	87.7
6.0	70.8	78.1
8.0	75.4	87.3
10.0	81.1	89.8`).split('\n').forEach((row) => {
  const [speedStr, angle1, angle2] = row.split('	');
  const speedStr2 = String(Number(speedStr));
  const target = tableData.find((t) => t.speed === speedStr);
  if (!target) { return }
  target.colArr = target.colArr.map((o, colIndex) => {
    const clock = (colIndex + 2) % 12 + 1;
    return {
      angle1,
      angle2,
      url: `assets/测风标风向旗归档数据/${speedStr}/${speedStr}m_${clock}点钟方向/${speedStr2}MS 来风${clock}点钟方向.jpg`,
      urlViedo: `assets/测风标风向旗归档数据/${speedStr}/${speedStr}m_${clock}点钟方向/${speedStr2}MS 来风${clock}点钟方向.mp4`,
    }
  })
})

@Component({
  selector: 'app-wind-type-table',
  templateUrl: './wind-type-table.component.html',
  styleUrls: ['./wind-type-table.component.scss']
})
export class WindTypeTableComponent implements OnInit {
  constructor(
  ) { }
  colArr = new Array(12).fill(0).map((o, i) => {
    return {
      aa: `${i * 30}`,
      bb: `${(i + 2) % 12 + 1}点`,
    }
  })
  tableData = tableData
  showData: null | {
    angle1: string;
    angle2: string;
    url: string;
    urlViedo:string;
  } = null;
  show(data: {
    angle1: string;
    angle2: string;
    url: string;
    urlViedo:string;
  }) {
    this.showData = data;
  }
  async ngOnInit() {
  }
  reset() {
  }
}