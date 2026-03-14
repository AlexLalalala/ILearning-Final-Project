import { Inventory } from 'src/inventory/inventory.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Inventory, (inventory) => inventory.category)
  inventories: Inventory[];

  @VersionColumn({ default: 0 })
  version: number;
}
