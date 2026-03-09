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
  EntitySchema,
} from 'typeorm';
// import { ItemSchemaEntity } from './helper/inventory.entity.item-fields';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { AddItemFields } from './helper/inventory.entity.item-field';

@Entity()
// @AddItemFields('test_field', 'test')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inventories)
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

// Object.defineProperty(Inventory.prototype, 'test', {
//   writable: true,
//   configurable: true,
//   enumerable: true,
// });

// console.log(Inventory.test);

// // === Items' Schema Part ===
// // short text
// @Column({ default: false })
// is_active_short_text1: boolean;

// @Column({ nullable: true })
// title_short_text1: string;

// @Column({ nullable: true })
// desc_short_text1: string;

// @Column({ default: false })
// is_active_short_text2: boolean;

// @Column({ nullable: true })
// title_short_text2: string;

// @Column({ nullable: true })
// desc_short_text2: string;

// @Column({ nullable: true })
// displayed_short_text2: boolean;

// @Column({ default: false })
// is_active_short_text3: boolean;

// @Column({ nullable: true })
// title_short_text3: string;

// @Column({ nullable: true })
// desc_short_text3: string;

// @Column({ nullable: true })
// displayed_short_text3: boolean;

// // long text
// @Column({ default: false })
// is_active_long_text1: boolean;

// @Column({ nullable: true })
// title_long_text1: string;

// @Column({ nullable: true })
// desc_long_text1: string;

// @Column({ default: false })
// is_active_long_text2: boolean;

// @Column({ nullable: true })
// title_long_text2: string;

// @Column({ nullable: true })
// desc_long_text2: string;

// @Column({ nullable: true })
// displayed_long_text2: boolean;

// @Column({ default: false })
// is_active_long_text3: boolean;

// @Column({ nullable: true })
// title_long_text3: string;

// @Column({ nullable: true })
// desc_long_text3: string;

// @Column({ nullable: true })
// displayed_long_text3: boolean;

// // numeral

// @Column({ default: false })
// is_active_number1: boolean;

// @Column({ nullable: true })
// title_number1: string;

// @Column({ nullable: true })
// desc_number1: string;

// @Column({ default: false })
// is_active_number2: boolean;

// @Column({ nullable: true })
// title_number2: string;

// @Column({ nullable: true })
// desc_number2: string;

// @Column({ nullable: true })
// displayed_number2: boolean;

// @Column({ default: false })
// is_active_number3: boolean;

// @Column({ nullable: true })
// title_number3: string;

// @Column({ nullable: true })
// desc_number3: string;

// @Column({ nullable: true })
// displayed_number3: boolean;

// // bool

// @Column({ default: false })
// is_active_bool1: boolean;

// @Column({ nullable: true })
// title_bool1: string;

// @Column({ nullable: true })
// desc_bool1: string;

// @Column({ default: false })
// is_active_bool2: boolean;

// @Column({ nullable: true })
// title_bool2: string;

// @Column({ nullable: true })
// desc_bool2: string;

// @Column({ nullable: true })
// displayed_bool2: boolean;

// @Column({ default: false })
// is_active_bool3: boolean;

// @Column({ nullable: true })
// title_bool3: string;

// @Column({ nullable: true })
// desc_bool3: string;

// @Column({ nullable: true })
// displayed_bool3: boolean;
// }

// export const Inventory = new EntitySchema(
//   {
//     name: "inventory",
//     columns: {
//       id: {
//         primary: true,
//         generated: true,
//         type: String
//       },
//       createdById: {
//         name: "created_by_id",
//         type: Number,
//         foreignKey: {
//           target: "author",
//           inverseSide: "inventories"
//         }
//       },
//       createdAt: {
//         name: "created_at",
//         type: Date,
//         createDate: true
//       },
//       title: {
//         type: String,
//         nullable: false,
//         length: 100
//       },
//       description: {
//         type: String,
//         nullable: true,
//         length: 255
//       },
//       imageUrl: {
//         name: "image_url",
//         type: String,
//         nullable: true
//       },
//       categoryId: {
//         name: "category_id",
//         type: Number,
//         foreignKey: {
//           target: "categories",
//           inverseSide: "inventories"
//         }
//       },
//       editAccess: {
//         name: "edit_access",
//         type: "varchar",
//         foreignKey: {
//           target: "users",
//           inverseSide: "access"
//         }
//       }
//     },
//     relations: {
//       createdById: {
//         type: "many-to-one",
//         target: "user"
//       },
//       editAccess: {
//         type: "many-to-many",
//         target: "user"
//       },
//       categoryId: {
//         type: "many-to-one",
//         target: "category"
//       }
//     }
//   }
// )
