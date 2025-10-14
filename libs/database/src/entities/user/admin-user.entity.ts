import { ChildEntity, Column } from 'typeorm';
import { AccountTypeEnum } from '@fit/shared';
import { BaseUser } from './base-user.entity';

@ChildEntity(AccountTypeEnum.admin)
export class AdminUser extends BaseUser {
  @Column({ type: 'boolean', default: false })
  isPlatformAdmin: boolean;
}
