import calm from "calm-tools.js";
import skate from "skatejs";

import CalmItem from "els/calm-item.js";

export default skate("calm-menu", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				calm.ready(() => {
					if(this.noselect === "") return;

					let items = Array.from(this._items.getDistributedNodes());

					let targetItem, prevSelected;
					for(let item of items) {
						if(targetItem && prevSelected) break;
						if(item.name === name) targetItem = item;
						if(item.selected === "") prevSelected = item;
					}

					if(!targetItem) return;

					if(prevSelected) prevSelected.selected = undefined;
					targetItem.selected = "";

					calm.emit(this, "select");
				});
			},
		},

		noselect: { attr: true },

		_items: {},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
				width: 256px;
				padding: 8px 0;
			}
		</style>

		<content id="items" select="calm-item"></content>
	`),

	created() {
		this._items = this.shadowRoot.getElementById("items");
		this.addEventListener("click", (evt) => { this.selected = evt.target.name; });
	},
});
