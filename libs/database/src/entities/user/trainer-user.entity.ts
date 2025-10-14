import { ChildEntity, Column } from 'typeorm';
import { AccountTypeEnum } from '@fit/shared';
import { BaseUser } from './base-user.entity';

@ChildEntity(AccountTypeEnum.trainer)
export class TrainerUser extends BaseUser {
  @Column({ type: 'text' })
  certificateRef: string;
}
