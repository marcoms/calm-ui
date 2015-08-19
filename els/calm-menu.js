import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-item.js";
import "els/calm-selection.js";

export default skate("calm-menu", {
	properties: {
		selected: {
			attr: true,
			set(name) {
				if(this._noSelect === "") return;
				this.$["selection"].selected = name;
			},
		},

		noselect: {
			attr: true,
			set(value) {
				if(value === "") {
					this.$["selection"].tapselect = undefined;
					this.selected = undefined;
				} else {
					this.$["selection"].tapselect = "";
				}
			},
		},
	},

	template: calm.shadowDom(`
		<style>
			:host {
				display: block;
				padding: 8px 0;
			}
		</style>

		<calm-selection tapselect id="selection">
			<content select="calm-item"></content>
		</calm-selection>
	`),

	created() {
		this.$["selection"].addEventListener("select", (evt) => {
			this.selected = evt.detail.name;
			calm.emit(this, "select", { detail: evt.detail });
		});

		if(this.selected) calm.emit(this, "select", { detail: {
			name: this.selected,
			node: this.$["selection"].selectedNode,
		}});
	},
});
