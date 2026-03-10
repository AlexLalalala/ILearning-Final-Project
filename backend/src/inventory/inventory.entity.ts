import { Category } from 'src/category/category.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  RelationId,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inventories, { onDelete: 'SET NULL' })
  created_by: User;

  @RelationId((inventory: Inventory) => inventory.created_by)
  created_by_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @RelationId((inventory: Inventory) => inventory.category)
  category_id: number;

  @ManyToMany(() => User)
  @JoinTable()
  edit_access: User[];
}
