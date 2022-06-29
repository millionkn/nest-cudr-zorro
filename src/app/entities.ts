import { BaseEntity, ID, DateString, Entity } from './utils/entity';

class CudrBase<T> implements BaseEntity<T>{
  id!: ID<T>;
}

export class BlobData extends CudrBase<'blobData'>{ }

@Entity('SportsMan')
export class SportsManEntity extends CudrBase<'SportsManEntity'> {
  编号!: string;
  姓名!: string;
  性别!: string;
  身高!: number;
}

@Entity('SportsManState')
export class SportsManStateEntity extends CudrBase<'SportsManEntity'> {
  运动员!: SportsManEntity;
  时间!: DateString;
  脉搏!: number;
  心率!: number;
  血压!: number;
  体温!: number;
}

@Entity('Field')
export class FieldEntity extends CudrBase<'FieldEntity'> {
  名称!: string;
  国家!: string;
  城市!: string;
  备注!: string;
}

@Entity('Anemometer')
export class AnemometerEntity extends CudrBase<'AnemometerEntity'> {
  赛场!: FieldEntity;
  编号!: string;
  侧边缘距离!: number;
  起点距离!: number;
  离地高度!: number;
}

@Entity('WindLog')
export class WindLogEntity extends CudrBase<'WindLogEntity'> {
  赛场!: FieldEntity;
  测风仪!: AnemometerEntity;
  记录组号!: string;
  时间!: DateString;
  风向!: string;
  风速!: string;
  温度!: string;
  气压!: string;
}

@Entity('BiathlonGrade')
export class BiathlonGradeEntity extends CudrBase<'BiathlonGrade'> {
  运动员!: SportsManEntity;
  赛场!: FieldEntity;
  记录组起始时间!: string
  时间!: DateString;
  射击姿势!: string;
  模式!: string;
  状态!: string;
  准心调教刻度!: string;
  成绩!: boolean;
  记录人!: string;
  靶位!: string;
}

@Entity('SkijumpGrade')
export class SkijumpGradeEntity extends CudrBase<'SkijumpGradeEntity'> {
  运动员!: SportsManEntity;
  赛场!: FieldEntity;
  时间!: DateString;
  天气!: string;
  气温!: number;
  气压!: number;
  体重!: number;
  滑行速度!: number;
  滑行姿势!: string;
  出台速度!: number;
  空中姿势!: string;
  落地距离!: number;
  成绩!: number;
  记录人!: string;
}

@Entity('MovieUrl')
export class MovieUrlEntity extends CudrBase<'MovieUrlEntity'> {
  赛场!: FieldEntity;
  关键字!: string;
  数据类型!: '照片' | '视频'
  影像url!: string;
  时间!: DateString;
}

@Entity('WindType')
export class WindTypeEntity extends CudrBase<'WindTypeEntity'> {
  风向!: string;
  风速!: number;
  风向标形态!: string;
}
