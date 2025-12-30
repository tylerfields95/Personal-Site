import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { BlogContentEntity } from './blog-content.entity';
import { BlogImageEntity } from './blog-image.entity';

@Entity('blog_bodies')
export class BlogBodyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  header?: string;

  @Column({ nullable: true })
  subHeader?: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @OneToMany(() => BlogImageEntity, (blogImage) => blogImage.blogBody, {
    cascade: true,
    eager: true,
  })
  blogImages?: BlogImageEntity[];

  @ManyToOne(() => BlogContentEntity, (blogContent) => blogContent.body, {
    onDelete: 'CASCADE',
  })
  blogContent: BlogContentEntity;
}