import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
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

  @Column({ default: 'active' })
  status: 'active' | 'banned';

  @Column({ default: false })
  is_admin: boolean;

  @CreateDateColumn()
  registered_at: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.created_by)
  inventories: Inventory[];

  @ManyToMany(() => Inventory)
  edit_accesses: Inventory[];
}
