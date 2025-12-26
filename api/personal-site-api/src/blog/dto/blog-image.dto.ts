export enum ImagePosition {
  Top = 0,
  Bottom = 1,
  Left = 2,
  Right = 3,
  HeaderTop = 4,
}

export class BlogImageDto {
  imageSrc?: string;
  imageName?: string;
  position?: ImagePosition;
}