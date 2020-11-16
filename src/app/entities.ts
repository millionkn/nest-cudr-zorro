import { BaseEntity, ID, DateString, Entity } from './utils/entity';

class CudrBase<T> implements BaseEntity<T>{
  id!: ID<T>;
  createDate!: DateString;
}

export class BlobData extends CudrBase<'blobData'>{ }

@Entity('user')
export class UserEntity extends CudrBase<'UserEntity'> {
  name!: string;
  username!: string;
  groups!: TGroupEntity[];
}

@Entity('TGroup')
export class TGroupEntity extends CudrBase<'TGroupEntity'> {
  name!: string;
  users!: UserEntity[];
}
