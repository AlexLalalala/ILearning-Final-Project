import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn } from "typeorm";
import type { UUID } from "node:crypto";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ default: 'active' })
  status: 'active' | 'banned'

  @Column({ default: false })
  is_admin: boolean

  @CreateDateColumn()
  registered_at: Date
}