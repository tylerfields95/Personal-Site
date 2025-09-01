import { Blogbody } from './blogBody';

export class BlogContent {
  public header: string = '';
  public subHeader: string = '';
  public createdOn?: Date;
  public lastModifiedOn?: Date;
  public author: string = '';

  public body?: Blogbody[];
}
