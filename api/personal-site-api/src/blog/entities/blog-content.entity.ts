import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BlogBodyEntity } from './blog-body.entity';
import { BlogImageEntity } from './blog-image.entity';

@Entity('blog_contents')
export class BlogContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  header: string;

  @Column()
  subHeader: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  lastModifiedOn: Date;

  @Column()
  author: string;

  @OneToMany(() => BlogImageEntity, (blogImage) => blogImage.blogBody, {
    cascade: true,
    eager: true,
  })
  headerImages?: BlogImageEntity[];

  @OneToMany(() => BlogBodyEntity, (blogBody) => blogBody.blogContent, {
    cascade: true,
    eager: true,
  })
  body?: BlogBodyEntity[];
}