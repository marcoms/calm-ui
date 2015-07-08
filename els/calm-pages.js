import calm from "calm-tools.js";
import skate from "skatejs";

import CalmPage from "els/calm-page.js";

export default skate("calm-pages", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				// TODO: calm-selector/smth for dry++

				calm.ready(() => {
					let pages = Array.from(this._pages.getDistributedNodes());

					let targetPage, prevSelected;
					for(let page of pages) {
						if(targetPage && prevSelected) break;
						if(page.name === name) targetPage = page;
						if(page.selected === "") prevSelected = page;
					}

					if(!targetPage) return;

					if(prevSelected) prevSelected.selected = undefined;
					targetPage.selected = "";

					calm.emit(this, "select");
				});
			},
		},

		_pages: {},
	},

	template: calm.shadowDom(`
		<style>
			:host { display: block; }
		</style>

		<content id="pages" select="calm-page"></content>
	`),

	created() {
		this._pages = this.shadowRoot.getElementById("pages");
	}
});
