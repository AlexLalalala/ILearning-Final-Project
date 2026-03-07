import { IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

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
}
