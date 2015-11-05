import calm from "calm-tools.js";
import skate from "skatejs";

import "els/calm-item.js";
import "els/calm-selection.js";

export default skate("calm-menu", {
	properties: {
		selected: calm.properties.string({
			attribute: true,
			set(el, {newValue: selected}) {
				if (el.noselect) return;
				el.$["selection"].selected = selected;
			},
		}),

		noselect: calm.properties.boolean({
			attribute: true,
			set(el, {newValue: noselect}) {
				if (noselect) {
					el.$["selection"].tapselect = false;
					el.selected = undefined;
				} else {
					el.$["selection"].tapselect = true;
				}
			},
		}),
	},

	render: calm.shadowDom(`
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

	ready(el) {
		el.$["selection"].addEventListener("select", (evt) => {
			el.selected = evt.detail.selected;
			calm.emit(el, "select", {detail: evt.detail});
		});
	},
});
