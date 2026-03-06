import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inventories)
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToMany(() => User)
  @JoinTable()
  edit_access: User[];
}
