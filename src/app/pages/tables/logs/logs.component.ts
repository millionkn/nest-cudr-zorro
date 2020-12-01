import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MqttService } from '../../mqtt.service';
import { DevicesStateService } from '../../devices-state.service';
import { serverConfig } from '../../serverCnfg';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {

  constructor(
    private router: ActivatedRoute,
    private mqttServ: MqttService,
    public deviceService: DevicesStateService,
    private location: Location,
  ) { }

  logs: any[] = [];
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
      if (item) {
        this.logs.unshift({
          time: payload.time,
          data: JSON.stringify(item),
        });
      }
    });
    this.cbs.push(() => subscription.unsubscribe());
  }
  goBack() {
    this.location.back();
  }
  ngOnDestroy() {
    this.cbs.forEach((fun) => fun());
  }
}
