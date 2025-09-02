export class Blogbody {
  public header?: string;
  public subHeader?: string;
  public body?: string;
  public blogImages?: blogImage[];

  public get rightAlignedImages(): blogImage[] {
    return this.blogImages?.filter((x: blogImage) => x.position === ImagePosition.Right) ?? [];
  }

  public get leftAlignedImages(): blogImage[] {
    return this.blogImages?.filter((x: blogImage) => x.position === ImagePosition.Left) ?? [];
  }

  public get topimages(): blogImage[] {
    return this.blogImages?.filter((x: blogImage) => x.position === ImagePosition.Top) ?? [];
  }

  public get bottomimages(): blogImage[] {
    return this.blogImages?.filter((x: blogImage) => x.position === ImagePosition.Bottom) ?? [];
  }

  constructor(other?: Partial<Blogbody>) {
    if (other) {
      this.header = other.header;
      this.subHeader = other.subHeader;
      this.body = other.body;
      this.blogImages = other.blogImages;
    }
  }
}

export class blogImage {
  public imageName?: string;
  public position?: ImagePosition;
}

export enum ImagePosition {
  Top, // 0
  Bottom, // 1
  Left, // 2
  Right, // 3
}
