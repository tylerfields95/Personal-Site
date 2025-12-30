import { DataSource } from 'typeorm';
import { BlogContentEntity } from './blog/entities/blog-content.entity';
import { BlogBodyEntity } from './blog/entities/blog-body.entity';
import { BlogImageEntity } from './blog/entities/blog-image.entity';
import { MediaEntity } from './entities/media.entity';
import * as env from 'dotenv';

env.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [BlogContentEntity, BlogBodyEntity, BlogImageEntity, MediaEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
