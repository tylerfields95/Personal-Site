import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BlogBodyEntity } from './blog-body.entity';
import { MediaEntity } from '../../entities/media.entity';

export enum ImagePosition {
  Top = 0,
  Bottom = 1,
  Left = 2,
  Right = 3,
  HeaderTop = 4,
}

@Entity('blog_images')
export class BlogImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageName?: string;

  @Column({ type: 'int', nullable: true })
  position?: ImagePosition;

  @Column({ nullable: true })
  mediaId?: number;

  @ManyToOne(() => MediaEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'mediaId' })
  media?: MediaEntity;

  @ManyToOne(() => BlogBodyEntity, (blogBody) => blogBody.blogImages, {
    onDelete: 'CASCADE',
  })
  blogBody: BlogBodyEntity;
}