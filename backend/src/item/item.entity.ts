import { IsString } from 'class-validator';
import { Inventory } from 'src/inventory/inventory.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventory, { nullable: false })
  inventory: Inventory;

  @RelationId((item: Item) => item.inventory)
  inventory_id: number;

  @ManyToOne(() => User)
  createdBy: User;

  @RelationId((item: Item) => item.createdBy)
  CreatedById: number;

  @Column({ nullable: true })
  short_text1?: string;

  @Column({ nullable: true })
  short_text2?: string;

  @Column({ nullable: true })
  short_text3?: string;

  @Column({ nullable: true })
  long_text1?: string;

  @Column({ nullable: true })
  long_text2?: string;

  @Column({ nullable: true })
  long_text3?: string;

  @Column({ nullable: true })
  number1?: number;

  @Column({ nullable: true })
  number2?: number;

  @Column({ nullable: true })
  number3?: number;

  @Column({ nullable: true })
  document_url1: string;

  @Column({ nullable: true })
  document_url2: string;

  @Column({ nullable: true })
  document_url3: string;

  @Column({ nullable: true })
  bool1: boolean;

  @Column({ nullable: true })
  bool2: boolean;

  @Column({ nullable: true })
  bool3: boolean;

  @VersionColumn({ default: 0 })
  version: number;
}
