import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-item.js";
import "els/calm-selection.js";

export default skate("calm-menu", {
	properties: {
		selected: {
			attr: true,
			type: calm.propType(String),
			set(name) {
				if(this.noselect) return;
				this.$["selection"].selected = name;
			},
		},

		noselect: {
			attr: true,
			type: Boolean,
			set(value) {
				if(value) {
					this.$["selection"].tapselect = false;
					this.selected = undefined;
				} else {
					this.$["selection"].tapselect = true;
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

			:host-context(calm-drawer:not([right]):not([bottom])) ::content [selected]{
				color: ${calm.colors.primary};
				fill: ${calm.colors.primary};
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
