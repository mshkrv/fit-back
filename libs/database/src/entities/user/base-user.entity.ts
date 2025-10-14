import { Column, Entity, TableInheritance } from 'typeorm';
import { AbstractEntity, AccountTypeEnum } from '@fit/shared';

@Entity('users')
@TableInheritance({
  pattern: 'STI',
  column: { type: 'enum', enum: AccountTypeEnum, name: 'type' },
})
export abstract class BaseUser extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 97 })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column()
  role: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName?: string;

  @Column({ type: 'boolean', default: false })
  isConfirmed: boolean;
}
