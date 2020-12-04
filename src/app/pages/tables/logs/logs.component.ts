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
    this.mqttServ.loadData('1', 'bkr/energyrouter/1/1.0.0/frame');
    const subscription = this.mqttServ.ReceiveData.subscribe((msg) => {
      const payload = JSON.parse(msg.payload);
      console.log(payload);
      if (payload.data && payload.data.length < 1) {
        return;
      }
      const modelId = this.router.snapshot.queryParams.modelId;
      const item = (payload.data as any[]).find((x) => String(x.id) === String(modelId));
      if (item) {
        this.logs.push({
          time: payload.time,
          data: item.frame,
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
