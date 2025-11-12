import { Blogbody, blogImage, ImagePosition } from './blogBody';

export class BlogContent {
  public header: string = '';
  public subHeader: string = '';
  public createdOn?: Date;
  public lastModifiedOn?: Date;
  public author: string = '';

  public headerImages?: blogImage[] = [];

  public get headerTopImages(): blogImage[] {
    return (
      this.headerImages?.filter((x: blogImage) => x.position === ImagePosition.HeaderTop) ?? []
    );
  }

  public body?: Blogbody[];
}
