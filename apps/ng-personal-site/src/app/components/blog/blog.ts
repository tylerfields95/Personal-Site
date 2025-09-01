import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { Blogbody, BlogContent } from '../../models';
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
    let blog = new BlogContent();
    blog.header = 'This is only a Test';
    blog.subHeader = 'SubHeader Test';
    blog.createdOn = new Date();
    blog.lastModifiedOn = blog.createdOn;
    blog.author = 'Tyler Fields';

    // Example list of Blogbody objects
    const blogBodies: Blogbody[] = [
      {
        header: 'Introduction',
        subHeader: 'Getting started',
        body: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
      },
      {
        header: 'Main Topic',
        subHeader: 'Deep dive',
        body: `**feature overview**
* A configurable container which can host the body content in a card, or freely in the page body
* configurable header text
* body text region
* ability to insert content into the body text in user defined locations`,
      },
      {
        header: 'Conclusion',
        subHeader: 'Wrapping up',
        body: 'This is the summary and closing thoughts.',
      },
    ];

    blog.body = blogBodies;

    return blog;
  }
}
