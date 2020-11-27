import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevicesStateService {
  deviceStateDic: { [id: string]: string } = {};
  stateDic: { [id: string]: string } = {};
  devicesInfo: {
    id: string,
    name: string,
    mid: string
  }[] = [];
  devicesInfoDic: {
    [id: string]:
    {
      id: string,
      name: string,
      mid: string
    }
  } = {};

  midInfoDic: {
    [mid: string]:
    {
      id: string,
      name: string,
      mid: string
    }
  } = {};

  lineInfoDic: {
    [mid: string]: any
  } = {};



  getState(arr: number[]) {
    const index = arr.findIndex(item => item === 1);
    if (index === -1) {
      return '无';
    } else {
      const state = this.stateDic[index.toString()];
      return state;
    }
  }

  constructor() {

    this.stateDic['0'] = '光伏供直流负荷';
    this.stateDic['1'] = '光伏存入储能';
    this.stateDic['2'] = '光伏供家庭交流负荷';
    this.stateDic['3'] = '光伏余量上网';
    this.stateDic['4'] = '储能供用户交流负荷';
    this.stateDic['5'] = '装置从电网买电存入储能';
    this.stateDic['6'] = 'P2P购电';
    this.stateDic['7'] = 'P2P售电';



    // init mock data
    /* this.deviceStateDic['d001'] = '1';
     this.deviceStateDic['d002'] = '1';
     this.deviceStateDic['d003'] = '0';
     this.deviceStateDic['d004'] = '0';
     this.deviceStateDic['d005'] = '0';
     this.deviceStateDic['d006'] = '0';
     this.deviceStateDic['d007'] = '1';
     this.deviceStateDic['d008'] = '0';
     this.deviceStateDic['d009'] = '1';
     this.deviceStateDic['d010'] = '1';*/


    this.devicesInfo.push({ id: '1', name: '北48', mid: '北48' });
    this.devicesInfo.push({ id: '8', name: '北33', mid: '北33' });
    this.devicesInfo.push({ id: '2', name: '北81', mid: '北81' });
    this.devicesInfo.push({ id: '5', name: '北01', mid: '北01' });
    this.devicesInfo.push({ id: '7', name: '北05', mid: '北05' });
    this.devicesInfo.push({ id: '3', name: '北07', mid: '北07' });
    this.devicesInfo.push({ id: '4', name: '北22', mid: '北22' });
    this.devicesInfo.push({ id: '9', name: '北37', mid: '北37' });
    this.devicesInfo.push({ id: '10', name: '北38', mid: '北38' });
    this.devicesInfo.push({ id: '6', name: '北23', mid: '北23' });

    this.lineInfoDic.北48 = { name1: '375V直流用户负荷', name2: '375V母线电压', name3: '48V直流用户负荷', name4: '48V母线电压', name5: '开关状态' };

    for (const info of this.devicesInfo) {
      this.devicesInfoDic[info.id] = info;
      this.midInfoDic[info.mid] = info;
    }

  }


}
