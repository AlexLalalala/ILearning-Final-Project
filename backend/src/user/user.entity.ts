import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  VersionColumn,
} from 'typeorm';
import type { UUID } from 'node:crypto';
import { Inventory } from 'src/inventory/inventory.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column()
  salt: string;

  @Column({ default: 'active' })
  status: 'active' | 'banned';

  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'registered_at' })
  registeredAt: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.createdBy, {
    onDelete: 'CASCADE',
  })
  inventories: Inventory[];

  @ManyToMany(() => Inventory, { onDelete: 'SET NULL' })
  editAccesses: Inventory[];

  @VersionColumn({ default: 0 })
  version: number;
}
