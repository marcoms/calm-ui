import calm from "calm-tools.js";
import skate from "skatejs";

import CalmItem from "els/calm-item.js";
import CalmSelection from "els/calm-selection.js";

export default skate("calm-menu", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				calm.ready(() => {
					if(this._noSelect === "") return;
					this._selection.selected = name;
				});
			},
		},

		noSelect: {
			attr: true,
			set(value) {
				calm.ready(() => {
					if(value === "") {
						this._selection.tapSelect = undefined;
						this.selected = undefined;
					} else {
						this._selection.tapSelect = "";
					}
				});
			},
		},

		_selection: {},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
				width: 256px;
				padding: 8px 0;
			}
		</style>

		<calm-selection tap-select id="selection">
			<content select="calm-item"></content>
		</calm-selection>
	`),

	created() {
		this._selection = this.shadowRoot.getElementById("selection");
		this._selection.addEventListener("select", (evt) => {
			this.selected = evt.detail.name;
			calm.emit(this, "select", { detail: evt.detail });
		});
	},
});
