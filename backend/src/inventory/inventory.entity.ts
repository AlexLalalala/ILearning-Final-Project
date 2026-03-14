import type { UUID } from 'crypto';
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
  VersionColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inventories, { onDelete: 'SET NULL' })
  createdBy: User;

  @RelationId((inventory: Inventory) => inventory.createdBy, 'create_by_id')
  createdById: UUID;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @RelationId((inventory: Inventory) => inventory.category, 'category_id')
  categoryId: number;

  @ManyToMany(() => User)
  @JoinTable()
  editAccess: User[];

  @RelationId((inventory: Inventory) => inventory.editAccess, 'edit_access_ids')
  editAccessIds: Array<User['id']>;

  @VersionColumn({ default: 0 })
  version: number;
}
