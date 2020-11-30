import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { MqttService } from './mqtt.service';
import { serverConfig } from './serverCnfg';
import { DevicesStateService } from './devices-state.service';
import { Location } from '@angular/common';

const items = [
  {
    title: '光伏',
    child: [
      { register: '1', name: '光伏总发电功率', dw: 'W' },
      { register: '11', name: '用户光伏单相电表电压', dw: 'V' },
      { register: '12', name: '用户光伏单相电表电流', dw: 'A' },
      { register: '13', name: '用户光伏单相电表功率（±）', dw: 'W' },
      { register: '14', name: '用户光伏单相电表电量', dw: 'KWH' },
    ],
  },
  {
    title: '电池',
    child: [
      { register: '5', name: '电池总容量', dw: 'AH' },
      { register: '6', name: '电池当前剩余容量', dw: 'AH' },
      { register: '4', name: '电池功率（±）', dw: 'W' },
      { register: '2', name: '电池电压', dw: 'V' },
      { register: '3', name: '电池电流（±）', dw: 'A' },
      { register: '10', name: '电池SOC', dw: '%' },
      { register: '9', name: '电池电量差', dw: 'WH' },
      { register: '7', name: '电池总电量', dw: 'WH' },
      { register: '8', name: '电池剩余电量', dw: 'WH' },
    ],
  },
  {
    title: '直流',
    child: [
      { register: '63', name: '375V母线电压', dw: 'V' },
      { register: '64', name: '64V母线电压', dw: 'V' },
      { register: '65', name: '375V直流用户负荷', dw: 'W' },
      { register: '66', name: '48V直流用户负荷', dw: 'W' },
    ],
  },
  {
    title: '220V交流单相电表',
    child: [
      { register: '15', name: '220V交流单相电压', dw: 'V' },
      { register: '16', name: '220V交流单相电流', dw: 'A' },
      { register: '17', name: '220V交流单相功率(±）', dw: 'W' },
      { register: '18', name: '220V交流单相频率', dw: 'HZ' },
      { register: '19', name: '220V交流单相电量', dw: 'KWH' },
    ],
  },
  {
    title: '用户电表',
    child: [
      { register: '20', name: '用户电表A相电压', dw: 'V' },
      { register: '21', name: '用户电表B相电压', dw: 'V' },
      { register: '22', name: '用户电表C相电压', dw: 'V' },
      { register: '23', name: '用户电表A相电流', dw: 'A' },
      { register: '24', name: '用户电表B相电流', dw: 'A' },
      { register: '25', name: '用户电表C相电流', dw: 'A' },
      { register: '26', name: '用户电表当前功率（±）', dw: 'W' },
      { register: '27', name: '用户表A相功率（±）', dw: 'W' },
      { register: '28', name: '用户表B相功率（±）', dw: 'W' },
      { register: '29', name: '用户表C相功率（±）', dw: 'W' },
      { register: '30', name: '用户电表A相频率', dw: 'HZ' },
      { register: '31', name: '用户电表B相频率', dw: 'HZ' },
      { register: '32', name: '用户电表C相频率', dw: 'HZ' },
      { register: '33', name: '用户电表电量', dw: 'KWH' },
    ],
  },
  {
    title: '购电电表',
    child: [
      { register: '34', name: '购电电表A相电压', dw: 'V' },
      { register: '35', name: '购电电表B相电压', dw: 'V' },
      { register: '36', name: '购电电表C相电压', dw: 'V' },
      { register: '37', name: '购电电表A相电流', dw: 'A' },
      { register: '38', name: '购电电表B相电流', dw: 'A' },
      { register: '39', name: '购电电表C相电流', dw: 'A' },
      { register: '40', name: '购电当前总功率（±）', dw: 'W' },
      { register: '41', name: '购电A相功率（±）', dw: 'W' },
      { register: '42', name: '购电B相功率（±）', dw: 'W' },
      { register: '43', name: '购电C相功率（±）', dw: 'W' },
      { register: '44', name: '购电电表电量', dw: 'KWH' },
    ],
  },
  {
    title: '变流器',
    child: [
      { register: '45', name: '1号变流器电压', dw: 'V' },
      { register: '46', name: '1号变流器电流', dw: 'A' },
      { register: '47', name: '1号变流器当前功率', dw: 'W' },
      { register: '48', name: '2号变流器电压', dw: 'V' },
      { register: '49', name: '2号变流器电流', dw: 'A' },
      { register: '50', name: '2号变流器当前功率', dw: 'W' },
      { register: '51', name: '3号变流器电压', dw: 'V' },
      { register: '52', name: '3号变流器电流', dw: 'A' },
      { register: '53', name: '3号变流器当前功率', dw: 'W' },
      { register: '54', name: '4号变流器电压', dw: 'V' },
      { register: '55', name: '4号变流器电流', dw: 'A' },
      { register: '56', name: '4号变流器当前功率', dw: 'W' },
      { register: '57', name: '5号变流器电压', dw: 'V' },
      { register: '58', name: '5号变流器电流', dw: 'A' },
      { register: '59', name: '5号变流器当前功率', dw: 'W' },
      { register: '60', name: '6号变流器电压', dw: 'V' },
      { register: '61', name: '6号变流器电流', dw: 'A' },
      { register: '62', name: '6号变流器当前功率', dw: 'W' },
    ]
  },
];

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
    private location: Location,
  ) {
  }
  items = items;
  currentItem: any = {};
  private cbs = new Array<() => void>();
  ngOnInit() {
    this.mqttServ.loadData('1', serverConfig.mqttTopic);
    const subscription = this.mqttServ.ReceiveData.subscribe((msg) => {
      const payload = JSON.parse(msg.payload);
      if (payload.data && payload.data.length < 1) {
        return;
      }
      const modelId = this.router.snapshot.queryParams.modelId;
      const item = (payload.data as any[]).find((x) => x.id === Number(modelId));
      if (item) { this.currentItem = item; }
    });
    this.cbs.push(() => subscription.unsubscribe());
  }

  group(input: any[]) {
    return new Array(Math.ceil(input.length / 4)).fill(0).map((o, i) => input.slice(i * 4, i * 4 + 4));
  }
  cover(register: string | [string, string]) {
    if (typeof register === 'string') {
      return this.currentItem[register] || '--';
    } else {

    }
  }
  selectId = '';

  ngOnDestroy() {
    this.cbs.forEach((cb) => cb());
    this.mqttServ.unloadData();
  }
  goBack() {
    this.location.back();
  }
}
