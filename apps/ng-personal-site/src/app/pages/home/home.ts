import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { Blog } from '../../components/blog/blog';
import { Blogbody, BlogContent, blogImage, ImagePosition } from '../../models';

@Component({
  selector: 'app-home',
  imports: [Blog],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly _blogData: WritableSignal<BlogContent> = signal(this.buildFakeBlogData());
  public readonly blogData: Signal<BlogContent> = this._blogData.asReadonly();

  public buildFakeBlogData(): BlogContent {
    const blog = new BlogContent();
    blog.header = 'Welcome';
    blog.subHeader = 'An introduction';
    blog.createdOn = new Date();
    blog.lastModifiedOn = blog.createdOn;
    blog.author = 'Tyler Fields';

    const headerImages: blogImage[] = [
      {
        imageSrc: 'assets/images/portrait_circle.png',
        imageName: 'top img 1',
        position: ImagePosition.HeaderTop,
      },
    ];

    blog.headerImages = headerImages;

    const leftImages: blogImage[] = [
      {
        imageSrc: 'assets/images/portrait_circle.png',
        imageName: 'left img 1',
        position: ImagePosition.Left,
      },
    ];
    const rightImages: blogImage[] = [{ imageName: 'right img 1', position: ImagePosition.Right }];
    const bottomImages: blogImage[] = [
      { imageName: 'bottom img 1', position: ImagePosition.Bottom },
      { imageName: 'bottom img 2', position: ImagePosition.Bottom },
    ];
    const topImages: blogImage[] = [
      {
        imageSrc: 'assets/images/portrait_circle.png',
        imageName: 'top img 1',
        position: ImagePosition.HeaderTop,
      },
    ];

    const blogBodies: Blogbody[] = [
      new Blogbody({
        blogImages: [...topImages, ...bottomImages],
        body: `Hi, I’m Tyler Fields, a full-stack software developer with over six years of experience developing, modernizing, and optimizing enterprise-grade web applications.
        
This site is both a personal portfolio and a sandbox where I test ideas, share experiments, and write about what I’m learning. It’s built as a proof of concept to show my ability to design and develop a modern web application with Angular, a .NET back end, and a database. Over time, I’ll use it to publish blog posts, capture side projects, and document the technologies I’m exploring. 

The site is still pretty bare bones. so, bear  with me while i work through updating it from its current static form to something a little more fun. the plan at the moment is an angular front end (check), a simple monolithic ASP.NET core back end, and a postgreSQL database. 


The source code for this site is hosted on my github, [here](https://github.com/tylerfields95/Personal-Site).`,
      }),
    ];

    blog.body = blogBodies;
    return blog;
  }
}
