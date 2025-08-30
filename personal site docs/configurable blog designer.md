**GOAL**
This component should act as a platform for creating all other plain text pages. This should allow me to come in as an admin user and post a blog, or update a page without needing to update code.


**feature overview**
* A configurable container which can host the body content in a card, or freely in the page body
* configurable header text
* body text region
* ability to insert content into the body text in user defined locations
  
  
```
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
```


**TASKS**
- [ ] Create a blog type component with configurable properties
	- [ ] create a configurable header text area
		- [ ] header text
		- [ ] subheader text
		- [ ] author
		- [ ] publish date
		- [ ] update date
	- [ ] create a body region with configurable content 
		- [ ] body text
		- [ ] header
		- [ ] subheader