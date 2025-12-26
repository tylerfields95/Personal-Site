#UI #Component #Archetecture 

I have made the decision to avoid using third party libraries when possible. I think the easiest way to keep things themed well, long term, is to stick to custom components which play nicely with the projects theming variables (defined for tailwind in styles.scss). For those components which would be too much of a burden to develop, it should be prioritized that any third party library play nicely with both angular and tailwindCSS.

#### Current Third party UI packages
* [ngx-markdown](https://github.com/jfcere/ngx-markdown)
* [ngxsmk-datepicker](https://github.com/NGXSMK/ngxsmk-datepicker)
	* [documentation](https://ngxsmk.github.io/ngxsmk-datepicker/)
