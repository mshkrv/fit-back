import { ChildEntity } from 'typeorm';
import { AccountTypeEnum } from '@fit/shared';
import { BaseUser } from './base-user.entity';

@ChildEntity(AccountTypeEnum.client)
export class ClientUser extends BaseUser {}
