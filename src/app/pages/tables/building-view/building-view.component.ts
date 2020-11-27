import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Subscription } from 'rxjs';
import { MqttService } from './mqtt.service';
import { serverConfig } from './serverCnfg';
import { DevicesStateService } from './devices-state.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrls: ['./building-view.component.scss']
})
export class BuildingViewComponent implements OnInit, OnDestroy {
  constructor(
    private router: ActivatedRoute,
    private mqttServ: MqttService,
    public deviceService: DevicesStateService,
  ) {
  }

  show = false;
  mqttSub!: Subscription;
  mqttData = {};

  P: number | string | null | null = '--';
  GV: number | string | null = '--';
  GI: number | string | null = '--';
  GL: number | string | null = '--';
  CV: number | string | null = '--';
  CI: number | string | null = '--';
  ZL375: number | string | null = '--';
  MX375: number | string | null = '--';
  ZL48: number | string | null = '--';
  MX48: number | string | null = '--';
  KG375: number | string | null = '--';
  KG48: number | string | null = '--';
  NBQ_State1: number | string | null = '--';
  NBQ_State2: number | string | null = '--';
  NBQ_State3: number | string | null = '--';
  NBQ_State4: number | string | null = '--';
  NBQ_State5: number | string | null = '--';
  NBQ_State6: number | string | null = '--';
  DY220: number | string | null = '--';
  DL220: number | string | null = '--';
  GL220: number | string | null = '--';
  PL220: number | string | null = '--';

  UDY_A: number | string | null = '--';
  UDY_B: number | string | null = '--';
  UDY_C: number | string | null = '--';
  UDL_A: number | string | null = '--';
  UDL_B: number | string | null = '--';
  UDL_C: number | string | null = '--';
  UGL_TOTal: number | string | null = '--';
  UGL_A: number | string | null = '--';
  UGL_B: number | string | null = '--';
  UGL_C: number | string | null = '--';
  UPL_A: number | string | null = '--';
  UPL_B: number | string | null = '--';
  UPL_C: number | string | null = '--';

  GDY_A: number | string | null = '--';
  GDY_B: number | string | null = '--';
  GDY_C: number | string | null = '--';
  GDL_A: number | string | null = '--';
  GDL_B: number | string | null = '--';
  GDL_C: number | string | null = '--';
  GGL_A: number | string | null = '--';
  GGL_B: number | string | null = '--';
  GGL_C: number | string | null = '--';
  GTotal_GL: number | string | null = '--';
  DC_SYDL: number | string | null = '--';
  DC_DL: number | string | null = '--';
  DC_DY: number | string | null = '--';
  DC_GL: number | string | null = '--';
  DC_DLC: number | string | null = '--';
  DC_ZDL: number | string | null = '--';
  DC_SOC: number | string | null = '--';
  State: number | string | null = '--';
  ZXYG_GL: number | string | null = '--';
  FXYG_GL: number | string | null = '--';


  BLQ1_DY: number | string | null = '--';
  BLQ1_DL: number | string | null = '--';
  BLQ1_GL: number | string | null = '--';

  BLQ2_DY: number | string | null = '--';
  BLQ2_DL: number | string | null = '--';
  BLQ2_GL: number | string | null = '--';

  BLQ3_DY: number | string | null = '--';
  BLQ3_DL: number | string | null = '--';
  BLQ3_GL: number | string | null = '--';

  BLQ4_DY: number | string | null = '--';
  BLQ4_DL: number | string | null = '--';
  BLQ4_GL: number | string | null = '--';

  BLQ5_DY: number | string | null = '--';
  BLQ5_DL: number | string | null = '--';
  BLQ5_GL: number | string | null = '--';

  BLQ6_DY: number | string | null = '--';
  BLQ6_DL: number | string | null = '--';
  BLQ6_GL: number | string | null = '--';

  ngOnInit() {

    this.mqttServ.loadData('1', serverConfig.mqttTopic);
    this.mqttSub = this.mqttServ.ReceiveData.subscribe((msg) => {
      const payload = JSON.parse(msg.payload);
      if (payload.data && payload.data.length < 1) {
        return;
      }
      const modelId = this.router.snapshot.queryParams.modelId;
      console.log(modelId)
      const item = (payload.data as any[]).find((x) => x.id === Number(modelId))
      console.log(payload.data)
      if (!item) {
        return;
      }
      console.log(item)

      this.P = _.has(item, '1') ? _.round(item['1'], 1) : null;
      this.GV = _.has(item, '11') ? _.round(item['11'], 1) : null;
      this.GI = _.has(item, '12') ? _.round(item['12'], 1) : null;
      this.GL = _.has(item, '13') ? _.round(item['13'], 1) : null;
      this.CV = _.has(item, '2') ? _.round(item['2'], 1) : null;
      this.CI = _.has(item, '3') ? _.round(item['3'], 1) : null;


      this.ZL375 = _.has(item, '65') ? _.round(item['65'], 1) : null;
      this.MX375 = _.has(item, '63') ? _.round(item['63'], 1) : null;
      this.ZL48 = _.has(item, '66') ? _.round(item['66'], 1) : null;
      this.MX48 = _.has(item, '64') ? _.round(item['64'], 1) : null;
      this.KG375 = _.has(item, '116') ? _.round(item['116'], 1) : null;
      this.KG48 = _.has(item, '117') ? _.round(item['117'], 1) : null;
      this.NBQ_State1 = _.has(item, '109') ? _.round(item['109'], 1) : null;
      this.NBQ_State2 = _.has(item, '110') ? _.round(item['110'], 1) : null;
      this.NBQ_State3 = _.has(item, '111') ? _.round(item['111'], 1) : null;
      this.NBQ_State4 = _.has(item, '112') ? _.round(item['112'], 1) : null;
      this.NBQ_State5 = _.has(item, '113') ? _.round(item['113'], 1) : null;
      this.NBQ_State6 = _.has(item, '114') ? _.round(item['114'], 1) : null;

      this.DY220 = _.has(item, '15') ? _.round(item['15'], 1) : null;
      this.DL220 = _.has(item, '16') ? _.round(item['16'], 1) : null;
      this.GL220 = _.has(item, '17') ? _.round(item['17'], 1) : null;
      this.PL220 = _.has(item, '18') ? _.round(item['18'], 1) : null;

      this.UDY_A = _.has(item, '20') ? _.round(item['20'], 1) : null;
      this.UDY_B = _.has(item, '21') ? _.round(item['21'], 1) : null;
      this.UDY_C = _.has(item, '22') ? _.round(item['22'], 1) : null;
      this.UDL_A = _.has(item, '23') ? _.round(item['23'], 1) : null;
      this.UDL_B = _.has(item, '24') ? _.round(item['24'], 1) : null;
      this.UDL_C = _.has(item, '25') ? _.round(item['25'], 1) : null;
      this.UGL_TOTal = _.has(item, '26') ? _.round(item['26'], 1) : null;
      this.UGL_A = _.has(item, '27') ? _.round(item['27'], 1) : null;
      this.UGL_B = _.has(item, '28') ? _.round(item['28'], 1) : null;
      this.UGL_C = _.has(item, '29') ? _.round(item['29'], 1) : null;
      this.UPL_A = _.has(item, '30') ? _.round(item['30'], 1) : null;
      this.UPL_B = _.has(item, '31') ? _.round(item['31'], 1) : null;
      this.UPL_C = _.has(item, '32') ? _.round(item['32'], 1) : null;


      this.GDY_A = _.has(item, '34') ? _.round(item['34'], 1) : null;
      this.GDY_B = _.has(item, '35') ? _.round(item['35'], 1) : null;
      this.GDY_C = _.has(item, '36') ? _.round(item['36'], 1) : null;
      this.GDL_A = _.has(item, '37') ? _.round(item['37'], 1) : null;
      this.GDL_B = _.has(item, '38') ? _.round(item['38'], 1) : null;
      this.GDL_C = _.has(item, '39') ? _.round(item['39'], 1) : null;
      this.GGL_A = _.has(item, '41') ? _.round(item['41'], 1) : null;
      this.GGL_B = _.has(item, '42') ? _.round(item['42'], 1) : null;
      this.GGL_C = _.has(item, '43') ? _.round(item['43'], 1) : null;
      this.GTotal_GL = _.has(item, '40') ? _.round(item['40'], 1) : null;

      this.DC_SYDL = _.has(item, '8') ? _.round(item['8'], 1) : null;
      this.DC_DL = _.has(item, '3') ? _.round(item['3'], 1) : null;
      this.DC_DY = _.has(item, '2') ? _.round(item['2'], 1) : null;
      this.DC_GL = _.has(item, '4') ? _.round(item['4'], 1) : null;
      this.DC_DLC = _.has(item, '9') ? _.round(item['9'], 1) : null;
      this.DC_ZDL = _.has(item, '7') ? _.round(item['7'], 1) : null;
      this.DC_SOC = _.has(item, '10') ? _.round(item['10'], 1) : null;


      this.BLQ1_DY = _.has(item, '45') ? _.round(item['45'], 1) : null;
      this.BLQ1_DL = _.has(item, '46') ? _.round(item['46'], 1) : null;
      this.BLQ1_GL = _.has(item, '47') ? _.round(item['47'], 1) : null;
      this.BLQ2_DY = _.has(item, '48') ? _.round(item['48'], 1) : null;
      this.BLQ2_DL = _.has(item, '49') ? _.round(item['49'], 1) : null;
      this.BLQ2_GL = _.has(item, '50') ? _.round(item['50'], 1) : null;
      this.BLQ3_DY = _.has(item, '51') ? _.round(item['51'], 1) : null;
      this.BLQ3_DL = _.has(item, '52') ? _.round(item['52'], 1) : null;
      this.BLQ3_GL = _.has(item, '53') ? _.round(item['53'], 1) : null;
      this.BLQ4_DY = _.has(item, '54') ? _.round(item['54'], 1) : null;
      this.BLQ4_DL = _.has(item, '55') ? _.round(item['55'], 1) : null;
      this.BLQ4_GL = _.has(item, '56') ? _.round(item['56'], 1) : null;
      this.BLQ5_DY = _.has(item, '57') ? _.round(item['57'], 1) : null;
      this.BLQ5_DL = _.has(item, '58') ? _.round(item['58'], 1) : null;
      this.BLQ5_GL = _.has(item, '59') ? _.round(item['59'], 1) : null;
      this.BLQ6_DY = _.has(item, '60') ? _.round(item['60'], 1) : null;
      this.BLQ6_DL = _.has(item, '61') ? _.round(item['61'], 1) : null;
      this.BLQ6_GL = _.has(item, '62') ? _.round(item['62'], 1) : null;


      // temp
      this.State = _.has(item, '101') ? _.round(item['101'], 1).toString() : null;

      this.ZXYG_GL = _.round((_.round(item['13'], 1) + _.round(item['17'], 1) + _.round(item['26'], 1)) / 1000, 1);
      this.FXYG_GL = _.has(item, '26') ? _.round(item['26'], 1) : null;


      // console.log(this.mqttData);
    });





  }



  selectId = '';

  ngOnDestroy() {
    if (this.mqttSub) {
      this.mqttSub.unsubscribe();
    }
    this.mqttServ.unloadData();
  }

  selectedItemId = '1';

  sumType: 'dy' | 'dl' = 'dy';


  mockData_list_fdshshgl = [
    { id: '1', name: '总发电功率', state: '运行', color: 'blue' },
    { id: '2', name: '01路光伏', state: '运行', color: 'blue' },
    { id: '3', name: '02路光伏', state: '运行', color: 'blue' },
    { id: '4', name: '03路光伏', state: '运行', color: 'blue' },
    { id: '5', name: '04路光伏', state: '停止', color: 'red' }
  ];
  mockData_list_gfdldy = [
    { id: '1', name: '总电流电压', state: '运行', color: 'blue' },
    { id: '2', name: '01路光伏', state: '运行', color: 'blue' },
    { id: '3', name: '02路光伏', state: '运行', color: 'blue' },
    { id: '4', name: '03路光伏', state: '运行', color: 'blue' },
    { id: '5', name: '04路光伏', state: '停止', color: 'red' }
  ];
  mockData_list_chndldy = [
    { id: '1', name: '总电流电压', state: '', color: 'blue' },
    { id: '2', name: '01组储能', state: '', color: 'blue' },
    { id: '3', name: '02组储能', state: '', color: 'blue' },
    { id: '4', name: '03组储能', state: '', color: 'blue' },
    { id: '5', name: '04组储能', state: '', color: 'blue' }
  ];
  mockData_list_chnsoc = [
    { id: '1', name: '总剩余容量', state: '', color: 'blue' },
    { id: '2', name: '01组储能', state: '', color: 'blue' },
    { id: '3', name: '02组储能', state: '', color: 'blue' },
    { id: '4', name: '03组储能', state: '', color: 'blue' },
    { id: '5', name: '04组储能', state: '', color: 'red' }
  ];
  mockData_list_chngzhj = [
    { id: '1', name: '01组储能', state: '', color: 'blue' },
    { id: '2', name: '02组储能', state: '', color: 'blue' },
    { id: '3', name: '03组储能', state: '', color: 'blue' },
    { id: '4', name: '04组储能', state: '', color: 'blue' }
  ];

}
