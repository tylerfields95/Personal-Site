import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { Blogbody, BlogContent, blogImage, ImagePosition } from '../../models';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog',
  imports: [DatePipe, MarkdownComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  private readonly _blogData: WritableSignal<BlogContent> = signal(this.buildFakeBlogData());
  public readonly blogData: Signal<BlogContent> = this._blogData.asReadonly();

  constructor() {}

  public buildFakeBlogData(): BlogContent {
    const blog = new BlogContent();
    blog.header = 'This is only a Test';
    blog.subHeader = 'SubHeader Test';
    blog.createdOn = new Date();
    blog.lastModifiedOn = blog.createdOn;
    blog.author = 'Tyler Fields';

    const leftImages: blogImage[] = [
      { imageName: 'left img 1', position: ImagePosition.Left },
      { imageName: 'left img 2', position: ImagePosition.Left },
    ];
    const rightImages: blogImage[] = [{ imageName: 'right img 1', position: ImagePosition.Right }];
    const bottomImages: blogImage[] = [
      { imageName: 'bottom img 1', position: ImagePosition.Bottom },
      { imageName: 'bottom img 2', position: ImagePosition.Bottom },
    ];
    const topImages: blogImage[] = [{ imageName: 'right img 1', position: ImagePosition.Right }];

    const blogBodies: Blogbody[] = [
      new Blogbody({
        header: 'Introduction',
        subHeader: 'Getting started',
        blogImages: [...leftImages, ...bottomImages],
        body: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
      }),
      new Blogbody({
        header: 'Main Topic',
        subHeader: 'Deep dive',
        body: `**feature overview**
* A configurable container which can host the body content in a card, or freely in the page body
* configurable header text
* body text region
* ability to insert content into the body text in user defined locations`,
      }),
      new Blogbody({
        header: 'Conclusion',
        subHeader: 'Wrapping up',
        body: `\`\`\`
export class pageContent {
  Header: string = '';
  subHeader: string;
  postDate: Date;
  updateDate: Date;
  author: user = null;
  bodyContent: contentBlock[];
}

export class contentBlock {
  Header: string;
  subHeader: string;
  body: string;
}
\`\`\``,
      }),
    ];

    blog.body = blogBodies;
    return blog;
  }
}
