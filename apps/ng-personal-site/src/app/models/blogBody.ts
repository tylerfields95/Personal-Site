export class Blogbody {
  public header?: string;
  public subHeader?: string;
  public body?: string;
  public blogImage?: blogImage;
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
  TopLeft, // 4
  TopRight, // 5
  BottomLeft, // 6
  BottomRight, // 7
}
