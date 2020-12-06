import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { MqttService } from '../../mqtt.service';
import { serverConfig } from '../../serverCnfg';
import { DevicesStateService } from '../../devices-state.service';
import { Location } from '@angular/common';
import * as dayjs from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

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
    private http: HttpClient,
    private message: NzMessageService,
  ) {
  }
  sellValue = 0;
  buyValue = 0;
  buyDate = new Date();
  sellDate = new Date();
  items = this.http.post<{ config: string }>(`http://120.53.18.141:3002/api/building-view-config`, {}).pipe(map(({ config }) => eval(config)));
  currentItem: any = {};
  private cbs = new Array<() => void>();

  resolveRd(data: any[]) {
    console.log('rd', data);
    const modelId = this.router.snapshot.queryParams.modelId;
    const item = data.find((x) => x.id === Number(modelId));
    if (item) { this.currentItem = item; }
  }
  resolveRet(arr: any[]) {
    console.log('ret', arr);
    arr.forEach((ret) => {
      const type = Number(ret.type);
      const result = Number(ret.result);
      if (result === 0) {
        if (type === 7) {
          this.message.error('查询设备参数失败');
        } else {
          this.message.error('命令执行失败')
        }
      } else if (result === 1) {
        if (type === 7) {
          this.userPower = ret.user_power;
          this.batteryLow = ret.battery_low;
          this.batteryHigh = ret.battery_high;
          this.pvPower = ret.pv_power;
          this.standby = ret.standby;
          this.mode = ret.mode;
        } else {
          this.message.success('命令执行成功');
        }
      }
    });
  }
  ngOnInit() {
    this.mqttServ.loadData('1', serverConfig.mqttTopic);
    setTimeout(()=>{
      this.mqttServ.loadData('1', 'bkr/energyrouter/{0}/1.0.0/cmd_ret');
      this.getState();
    },4000);
    const subscription = this.mqttServ.ReceiveData.subscribe((msg) => {
      const payload = JSON.parse(msg.payload);

      if (payload.data instanceof Array) {
        if (msg.dest === `bkr/energyrouter/1/1.0.0/rd`) {
          this.resolveRd(payload.data)
        } else if (msg.dest === 'bkr/energyrouter/1/1.0.0/cmd_ret') {
          this.resolveRet(payload.data)
        }else{
          console.log('base',msg)
        }
      }
    });
    this.cbs.push(() => subscription.unsubscribe());
  }

  group(input: any[]) {
    return new Array(Math.ceil(input.length / 4)).fill(0).map((o, i) => input.slice(i * 4, i * 4 + 4));
  }
  cover(register: string) {
    return register in this.currentItem ? this.currentItem[register] : '--';
  }
  selectId = '';

  ngOnDestroy() {
    this.cbs.forEach((cb) => cb());
    this.mqttServ.unloadData();
  }
  goBack() {
    this.location.back();
  }
  getState() {
    console.log('getState')
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 7,
        id: Number(this.router.snapshot.queryParams.modelId),
      }]
    });
  }
  buyHandler() {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 1,
        id: Number(this.router.snapshot.queryParams.modelId),
        power: this.buyValue,
        time: dayjs(this.buyDate).format('HH:mm:ss'),
      }]
    });
  }
  standby = 60;
  mode = 10;
  sellHandler() {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 2,
        id: Number(this.router.snapshot.queryParams.modelId),
        power: this.sellValue,
        time: dayjs(this.sellDate).format('HH:mm:ss'),
      }]
    });
  }
  resetDate = new Date();
  resetDateHandler(date = dayjs().toDate()) {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 4,
        id: Number(this.router.snapshot.queryParams.modelId),
        time: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      }]
    });
  }
  resetCycleHandler() {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 5,
        id: Number(this.router.snapshot.queryParams.modelId),
        standby: this.standby,
        mode: this.mode,
      }]
    });
  }
  userPower = 200;
  batteryLow = 200;
  batteryHigh = 400;
  pvPower = 200;
  setValueHandler() {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 6,
        id: Number(this.router.snapshot.queryParams.modelId),
        user_power: this.userPower,
        battery_low: this.batteryLow,
        battery_high: this.batteryHigh,
        pv_power: this.pvPower,
      }]
    });
  }
  stopHandler() {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 3,
        id: Number(this.router.snapshot.queryParams.modelId),
      }]
    });
  }
}
