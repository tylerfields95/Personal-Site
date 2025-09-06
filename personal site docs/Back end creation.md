The back end thus far is a solution with a single project, "PersonalSiteApi". this project is an AspNetCore application targeting .net 8. The general idea is that this will act as a monolithic api for personal site, as not to overcomplicate things. 

**Installed Packages**
* Microsoft.EntityFrameworkCore (8.0.19)
	* contains linq etc. all the junk thats used to actually interact with the DB in a meaningful way.
* Microsoft.EntityFrameworkCore.Design (8.0.19) 
	* Used for migrations. wasnt needed on AST because we were using the scaffolding project to generate object models in a DB first sort of fashion. 
* Npgsql.EntityFrameworkCore.PostgreSQL (8.0.11)
	* provides the an interface for communicating with the postgreSQL DB through the entityFrameworkCore package.
* AutoMapper (15.0.1)
	* easily go from DTO to entityModel Obj/collection
* AutoMapper.Extensions.Microsoft.DependencyInjection (15.0.1)
	* supposedly allows the automapper to be injected



**Tasks**
- [ ] Create Blog object
	- [ ] give the blog object a FK relationship to blog Content in a one to many fashion
- [ ] Create BlogContent Object
- [ ] Create DbContext
	- [ ] register Blog ObjectModel 
	- [ ] register BlogContent objectModel
- [ ] Run migration against PersonalSiteDB in docker container
- [ ] Populate Db with test data from the client (no images for now)
- [ ] connect the front end to the back end