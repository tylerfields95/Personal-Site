import { BlogBodyDto } from './blog-body.dto';
import { BlogImageDto } from './blog-image.dto';

export class BlogContentDto {
  header: string;
  subHeader: string;
  createdOn?: Date;
  lastModifiedOn?: Date;
  author: string;
  headerImages?: BlogImageDto[];
  body?: BlogBodyDto[];
}