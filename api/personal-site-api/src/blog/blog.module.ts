import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogContentEntity } from './entities/blog-content.entity';
import { BlogBodyEntity } from './entities/blog-body.entity';
import { BlogImageEntity } from './entities/blog-image.entity';
import { MediaEntity } from '../entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BlogContentEntity,
      BlogBodyEntity,
      BlogImageEntity,
      MediaEntity,
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
