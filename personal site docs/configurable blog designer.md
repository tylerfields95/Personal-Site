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


2025-09-06
This stuff is all largely done from a client perspective, and now i am more focused on the [back end](obsidian://open?vault=personal%20site%20docs&file=Back%20end%20creation) portion of this. 

**TASKS**
- [ ] Create a blog type component with configurable properties (client work)
	- [ ] Get real data 
	- [x] create a configurable header text area ✅ 2025-09-06
		- [x] header text ✅ 2025-09-06
		- [x] subheader text ✅ 2025-09-06
		- [x] author ✅ 2025-09-06
		- [x] publish date ✅ 2025-09-06
		- [x] update date ✅ 2025-09-06
	- [x] create a body region with configurable content ✅ 2025-09-06
		- [x] body text ✅ 2025-09-06
		- [x] header ✅ 2025-09-06
		- [x] subheader ✅ 2025-09-06