import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { serverConfig } from './serverCnfg';
import { CommonService } from './common.service';

import { Paho } from 'ng2-mqtt/mqttws31';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private mqttClient: any;
  private sid = ''; // station ID
  ReceiveData = new Subject<{
    dest: string,
    payload: string
  }>();

  constructor(private comServ: CommonService) {
    this.connect();
  }

  private connect(): void {

    // Topic = "qxxn/smartheat/00002/1.0.0/rd/"
    // Server = "st.iotqsgf.com"
    // Port = 11885
    // Username = "tdqs"
    // Password = "qsgf8888"
    const clientId: any = this.comServ.getNewGUIDString();
    this.mqttClient = new Paho.MQTT.Client(serverConfig.mqttUri, serverConfig.mqttPort, serverConfig.mqttPath, clientId);
    // this.mqttClient = new Paho.MQTT.Client('mq.tongxinmao.com', 18832, '/web', clientId);

    this.mqttClient.onConnectionLost = (responseObject: any) => {
      console.log('mqtt 连接丢失');
      this.connect();
    };

    this.mqttClient.onMessageArrived = (message: any) => {
      this.ReceiveData.next({
        dest: message.destinationName,
        payload: message.payloadString
      });
    };

    this.mqttClient.connect(
      {
        // useSSL: true,
        userName: serverConfig.mqttuserName,
        password: serverConfig.mqttpassword,
        onSuccess: this.onConnected.bind(this),
        onFailure: this.onFailureed.bind(this),
      }
    );
  }

  private onFailureed(er: any): void {
    console.log('mqtt 连接失败');
    this.connect();
  }

  private onConnected(): void {
    console.log('mqtt 连接成功.');
    if (this.sid !== '') {
      this.loadData(this.sid, this.topic);
    }
  }

  topic: string = serverConfig.mqttTopic;
  public loadData(sid: string, topic: null | string = null) {
    this.sid = sid;
    this.topic = topic || serverConfig.mqttTopic;
    const cacheFilter: string = this.topic.replace('{0}', sid);
    if (this.mqttClient.isConnected()) {
      this.mqttClient.subscribe(cacheFilter, undefined);
      console.log('mqtt 订阅成功.');
    }
  }

  public unloadData(sid?: string) {

    if (this.mqttClient.isConnected()) {
      sid = sid || this.sid;
      if (sid !== '') {
        const cachaFilter: string = this.topic.replace('{0}', sid);
        this.mqttClient.unsubscribe(cachaFilter, undefined);
        this.sid = '';
        console.log('mqtt 撤销成功.');
      }
    }
  }
}