import { BlogImageDto } from './blog-image.dto';

export class BlogBodyDto {
  header?: string;
  subHeader?: string;
  body?: string;
  blogImages?: BlogImageDto[];
}