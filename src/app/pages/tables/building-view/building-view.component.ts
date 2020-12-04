import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { MqttService } from '../../mqtt.service';
import { serverConfig } from '../../serverCnfg';
import { DevicesStateService } from '../../devices-state.service';
import { Location } from '@angular/common';
import * as dayjs from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  ) {
  }
  sellValue = 0;
  buyValue = 0;
  buyDate = new Date();
  sellDate = new Date();
  items = this.http.post<{ config: string }>(`http://120.53.18.141:3002/api/building-view-config`, {}).pipe(map(({ config }) => eval(config)));
  currentItem: any = {};
  private cbs = new Array<() => void>();
  ngOnInit() {
    this.mqttServ.loadData('1', serverConfig.mqttTopic);
    const subscription = this.mqttServ.ReceiveData.subscribe((msg) => {
      const payload = JSON.parse(msg.payload);
      console.log(payload);
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
        type: 3,
        id: Number(this.router.snapshot.queryParams.modelId),
        time: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      }]
    });
  }
  resetCycleHandler() {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 4,
        id: Number(this.router.snapshot.queryParams.modelId),
        standby: this.standby,
        mode: this.mode,
      }]
    });
  }
  stopHandler() {
    this.mqttServ.send({
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: [{
        type: 5,
        id: Number(this.router.snapshot.queryParams.modelId),
      }]
    });
  }
}
