---

kanban-plugin: board

---

## To Do

- [ ] Add Full Contact Page
- [ ] [[Write about me text]]
	#AboutMe
- [ ] Host Back End
	#infrastructure
- [ ] Host Prod Database
	#DB #infrastructure
- [ ] Figure out the best way to deal with images
	#infrastructure


## Active

- [ ] Add Theme Toggle to mobile navbar
	#UI


## Done

**Complete**
- [x] Android navigation footer panel is themed incorrectly ✅ 2025-12-18
	#UI #Mobile
	
	The android navigation at the bottom of the screen somehow decides on the fly how it will be themed based on the content (or something). This needs to reflect the current dark/light theme selection in the navbar.
- [x] fix mobile height issue. ✅ 2025-12-18
	#UI #Mobile 
	
	On chrome mobile (android), there is a dedicated portion of the screen that is taken up by both the android navigation buttons and the browser header UI region. The browser header can be dismissed by scrolling down slightly, but the android footer is static.
	
	The page layout should account for the available space regardless of the current situation (browser header visible or not)


## V1.0

**Complete**
- [x] Deploy Latest client code to S3 ✅ 2025-12-18
	#infrastructure
- [x] Fix markdown colors ✅ 2025-12-16
	#UI
- [x] host site on tylerfields.me ✅ 2025-12-16
	#AWS #Cloud #S3 #infrastructure
- [x] Configure Dark theme ✅ 2025-12-16
	#UI
- [x] Fix transition times when toggling theme ✅ 2025-12-16
	#UI
- [x] Add theme switcher ✅ 2025-11-17
	#UI
- [x] [[Fix Navbar Behavior]] ✅ 2025-09-20
	#UI #NavBar
- [x] Host Client App ✅ 2025-11-17
	#ClientApp #infrastructure
- [x] Set up the Home page with static Blog ✅ 2025-10-06
- [x] Move current fake blog page to second Page ✅ 2025-09-25
- [x] Add Social links ✅ 2025-10-06
	#UI #NavBar
- [x] Style Scroll Bars ✅ 2025-10-06
	#UI
- [x] Clean Up blog Component ✅ 2025-09-25
- [x] [[configurable blog designer]] ✅ 2025-09-25
- [x] Create Basic Site Theme variables ✅ 2025-09-17
	#UI #Theme
- [x] Create a toggle switch component ✅ 2025-11-17
	#UI




%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[false,false,false,false],"table-sizing":{"card":272}}
```
%%