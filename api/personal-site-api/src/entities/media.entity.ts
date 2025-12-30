import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @Column()
  fileType: string;

  @Column()
  size: number;

  @CreateDateColumn()
  createdOn: Date;

  @Column({ nullable: true })
  userId?: number;
}