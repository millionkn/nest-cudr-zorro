import { Pipe, PipeTransform, Inject } from '@angular/core';
import { LanguageService } from './language.service';
import { map } from 'rxjs/operators';

const table: any = {
  切换语言: 'change language',
  冬奥重点运动员训练比赛及风环境管理大数据平台: 'Big Data Platform of Performance and Wind for WOG ',
  基本信息: 'Basic information',
  运动员信息: 'Athlete information',
  赛场信息: 'Venue information',
  训练记录: 'Training records',
  体征参数: 'Physical parameters',
  风环境: 'Wind environment',
  滑雪成绩: 'Skiing results',
  冬季两项: 'Biathlon',
  其他信息: 'Other information',
  影像记录: 'Image records',
  测风仪: 'Anemometer',
  风向标形态: 'Wind vane',
  序号: 'Serial number',
  编号: 'Identifier',
  运动员姓名: 'Athlete Name',
  性别: 'Gender',
  身高: 'Height',
  操作: 'Operation',
  赛场名称: 'Venue name',
  国家: 'Country',
  城市: 'City',
  备注: 'Remarks',
  时间: 'Time',
  脉搏: 'Pulse',
  心率: 'Heart rate',
  血压: 'Blood pressure',
  体温: 'Temperature',
  赛场: 'Venue',
  记录组号: 'group number',
  风向: 'Wind direction',
  风速: 'Wind speed',
  温度: 'Air temperature',
  气压: 'Atmospheric pressure',
  导入: 'Import',
  导出: 'Export',
  运动员: 'Athlete',
  天气: 'Weather',
  气温: 'Air temperature',
  体重: 'Weight',
  滑行速度: 'Gliding speed',
  滑行姿势: 'Gliding posture',
  出台速度: 'start speed',
  空中姿势: 'Air posture',
  落地距离: 'Landing distance',
  成绩: 'Result',
  记录人: 'Recorder',
  射击姿势: 'Shooting posture',
  准心调校刻度: 'Alignment calibration',
  靶位: 'Target site',
  表格模式: 'Table mode',
  热力图模式: 'Heat map mode',
  关键字: 'Keyword',
  起点距离: 'Starting distance',
  离地高度: 'Height above ground',
  最高风速: 'Maximum wind speed',
  最低风速: 'Minimum wind speed',
  姓名: 'Name',
  编辑: 'edit',
  删除: 'delete',
  添加: 'add',
  查询: 'search',
  重置: 'reset',
  查看: 'show',
};

@Pipe({
  name: 'language',
})
export class LanguagePipe implements PipeTransform {

  constructor(
    @Inject(LanguageService) private service: LanguageService,
  ) {
  }
  transform(str: string) {
    return this.service.ob$.pipe(map((l) => {
      if (l === '中文') {
        return str;
      } else {
        return table[str] || str;
      }
    }));
  }
}
